/**
 * Type definition for a logging function that can accept any type of message followed by an arbitrary
 * number of additional parameters.
 */
export type StoreLogger = (message: unknown, ...extras: unknown[]) => void;

/**
 * Type for a state reducer function that allows modification of the store's state.
 * The function receives the current state and returns a new partial state.
 *
 * @template T - The full state type
 * @template K - The partial state type returned by the reducer
 */
export type StoreStateReducer<T = unknown, K = unknown> = (fullState: T) => K;

/**
 * Type definition for the structure of the store's state as an object with string keys and values of any type.
 */
export interface StoreStateType {
  [key: string]: unknown;
}

/**
 * Defines the structure for entries in the store registry.
 */
export interface StoreRegistryEntry {
  slice: string; // Unique name of the store
  claimId: string; // Identifier used for claiming or referencing the store
  logger?: StoreLogger; // Optional logger function for logging store operations
}
