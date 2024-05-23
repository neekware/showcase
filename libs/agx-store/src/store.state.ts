import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';
import { StoreLogger, StoreRegistryEntry, StoreStateReducer, StoreStateType } from './store.model';
import { deepFreeze, isFunction } from './store.util';

/**
 * A store that maintains its state immutably and notifies subscribers of changes.
 * It extends BehaviorSubject from RxJS to inherit behavior for broadcasting the state to observers.
 *
 * @template T - The type of the state held by the store extending the StoreStateType interface
 */
export class ImmutableStore<T extends StoreStateType> extends BehaviorSubject<T> {
  /**
   * Constructs a new instance of ImmutableStore with the given initial state.
   *
   * @param initialData - The initial state of the store.
   */
  constructor(initialData: T) {
    super(initialData);
  }

  /**
   * Overrides the BehaviorSubject's `next` method to publish a new state to the subscribers.
   * This implementation maintains immutability of the state.
   *
   * @param data - The new state to be published. This should be an immutable version of the state
   *               if immutability is a concern in your application.
   */
  next(data: T): void {
    super.next(data);
  }

  /**
   * Retrieves the current state as a read-only object to prevent modification.
   * This method overrides the existing `getValue` method to ensure the state
   * is returned as a `Readonly` object, supporting immutability patterns.
   *
   * @returns {Readonly<T>} The current state encapsulated as a readonly object.
   */
  getValue(): Readonly<T> {
    return super.getValue() as Readonly<T>;
  }
}

/**
 * Class to manage the state of a store, with functionality to handle state
 * immutability, claiming, updating, and releasing state slices.
 */
export class StoreState<T extends StoreStateType> {
  private immutable = true;
  private registry = new Map<string, StoreRegistryEntry>();
  private store$: ImmutableStore<T>;

  /**
   * Constructs a StoreState instance.
   * @param initialState The initial state of the store
   * @param immutable Optional boolean to set state immutability, default true
   */
  constructor(initialState: T, immutable = true) {
    this.immutable = immutable;
    this.store$ = new ImmutableStore<T>(immutable ? deepFreeze(initialState) : initialState);
  }

  /**
   * Releases all claimed slices and resets the store state to its initial value.
   */
  reset() {
    this.registry.clear();
  }

  /**
   * Claims a slice of the store's state for exclusive modification.
   * @param slice The name of the state slice to claim.
   * @param logger Optional logger function for debugging.
   * @returns A unique claim ID used for later updates or release of the slice.
   */
  claim(slice: string, logger?: StoreLogger): string {
    if (!slice) {
      throw new Error(`Invalid slice name "${slice}".`);
    }

    if ([...this.registry.values()].some((entity) => entity.slice === slice)) {
      throw new Error(`Slice "${slice}" already claimed.`);
    }

    const claimId = uuidV4();
    this.registry.set(claimId, { slice, claimId, logger });

    if (logger) {
      logger(`[SLICE][CLAIMED][${slice}]:[${claimId}]`);
    }

    return claimId;
  }

  /**
   * Releases a previously claimed slice, reverting any exclusive modification rights.
   * @param claimId The unique ID used to claim the slice.
   */
  release(claimId: string) {
    const entity = this.registry.get(claimId);
    if (!entity) {
      throw new Error(`Slice "${claimId}" not claimed.`);
    }

    const state = this.state();
    const newState: T = { ...state, [entity.slice]: undefined } as T;
    this.immutable ? this.store$.next(deepFreeze(newState)) : this.store$.next(newState);

    if (entity?.logger) {
      entity.logger(`[SLICE][RELEASED][${entity.slice}]:[${claimId}]`);
    }

    this.registry.delete(claimId);
  }

  /**
   * Retrieves the current state of the store.
   * @returns The current state object of type T.
   */
  state(): T {
    return this.store$.getValue();
  }

  /**
   * Updates the state of a claimed slice using a reducer function or a partial state object.
   * @param claimId The unique ID of the claimed slice.
   * @param updater A reducer function or partial state object to update the state.
   * @param action Optional description of the action for logging purposes.
   * @returns The new state of the updated slice.
   */
  update<K = unknown>(
    claimId: string,
    updater: StoreStateReducer<T, K> | Partial<T> | K,
    action?: string
  ): K {
    const entry = this.registry.get(claimId);

    if (!entry) {
      throw new Error(`No claim registered with ID "${claimId}".`);
    }

    const currentState = this.state();
    if (entry.logger) {
      const prevMsg = `[PREV][${entry.slice}]${action ? `[${action}]` : ''}`;
      entry.logger(prevMsg, { [entry.slice]: currentState[entry.slice] });
    }

    const partialState = isFunction(updater) ? updater(currentState) : updater;
    const nextState = { ...currentState, [entry.slice]: partialState };
    this.immutable ? this.store$.next(deepFreeze(nextState)) : this.store$.next(nextState);

    if (entry.logger) {
      const prevMsg = `[NEXT][${entry.slice}]${action ? `[${action}]` : ''}`;
      entry.logger(prevMsg, { [entry.slice]: currentState[entry.slice] });
    }

    return this.state()[entry.slice] as K;
  }

  /**
   * Provides an Observable stream of the current store state.
   * @returns An Observable emitting the current state.
   */
  state$(): Observable<T> {
    return this.store$.asObservable();
  }

  /**
   * Selects and returns a specific slice of the store state as an Observable.
   * @param name The name of the state slice to observe.
   * @returns An Observable emitting the current value of the specified slice.
   */
  select$<K>(name: string): Observable<K> {
    return this.store$.pipe(
      map((state: T) => state[name] as K),
      distinctUntilChanged()
    );
  }
}
