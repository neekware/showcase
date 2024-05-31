'use client';

import { createContext, createElement, useContext, useEffect, useState } from 'react';
import { StoreLogger, StoreStateType } from '@repo/ag-store';
import { getStoreInstance } from './state.store';

interface AppStateValue<T extends StoreStateType> {
  state: T;
  setAppState: (value: T) => void;
}

const AppStateContext = createContext<AppStateValue<StoreStateType>>(
  {} as AppStateValue<StoreStateType>
);

interface StateProviderProps {
  stateName: string;
  logger?: StoreLogger;
  children: React.ReactNode;
}

export const StateProvider = ({ stateName, logger, children }: StateProviderProps) => {
  const store = getStoreInstance();
  const claimId = store?.claim(stateName, logger);

  const [state, setState] = useState<StoreStateType>(store?.state() || {});

  const setAppState = (value: StoreStateType) => {
    store?.update(claimId ?? '', value);
    setState(store?.state() || {});
  };

  useEffect(() => {
    return () => {
      // On unmount, reset the store
      store?.reset();
    };
  }, []);

  return createElement(AppStateContext.Provider, { value: { state, setAppState } }, children);
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
