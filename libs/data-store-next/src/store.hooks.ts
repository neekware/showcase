import { useAtom } from 'jotai';
import { type AppState } from '@lib/data-model-shared';
import { appStateAtom, getDefaultState } from './store.state';

/**
 * Hook to access and update the application state
 * @returns An array containing the current state and an update function
 */
// eslint-disable-next-line no-unused-vars
export function useAppState(): readonly [AppState, (partialConfig: Partial<AppState>) => void] {
  const [state, setAppState] = useAtom(appStateAtom);

  /**
   * Function to update the application state immutably
   * @param partialConfig - Partial configuration to update the state
   */
  const updateImmutable = (partialConfig: Partial<AppState>) => {
    setAppState({
      ...getDefaultState(),
      ...state,
      ...partialConfig,
    });
  };

  return [state, updateImmutable] as const;
}
