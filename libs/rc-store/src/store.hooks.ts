import { useEffect, useState } from 'react';
import { type StoreState, type StoreStateType } from '@repo/agx-store';
import { GlobalStore } from './store.global';

export const useAppStore = () => {
  const [store, setStore] = useState<StoreState<StoreStateType> | null>(null);

  useEffect(() => {
    if (!store) {
      setStore(GlobalStore.getStore({}));
    }

    return () => {
      store?.reset();
    };
  }, []);

  return { store };
};
