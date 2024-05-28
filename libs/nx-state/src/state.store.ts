import { StoreState, StoreStateType } from '@repo/ag-store';

let storeInstance: StoreState<StoreStateType> | null;

export function getStoreInstance<T extends StoreStateType>() {
  if (!storeInstance) {
    storeInstance = new StoreState<T>({} as T, true);
  }
  return storeInstance;
}
