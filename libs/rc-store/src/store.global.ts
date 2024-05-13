import { StoreState, type StoreStateType } from '@repo/agx-store';

export class GlobalStore {
  private static instance: GlobalStore | null = null;
  private store: StoreState<StoreStateType> | null = null;

  private constructor() {
    // ensure singleton from within constructor
  }

  public static getStore(
    state: StoreStateType,
    immutable = true
  ): StoreState<StoreStateType> | null {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
      GlobalStore.instance.store = new StoreState<StoreStateType>(state, immutable);
    }
    return GlobalStore.instance.store;
  }

  public static reset(): void {
    GlobalStore.instance?.store?.reset();
    GlobalStore.instance?.store ? (GlobalStore.instance.store = null) : undefined;
    GlobalStore.instance = null;
  }
}
