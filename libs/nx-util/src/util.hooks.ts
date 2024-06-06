// Import the useEffect and useState hooks from React
import { useEffect, useState } from 'react';

// Define a custom hook called useDebounce
export const useDebounce = <T>(inputValue: T, delay: number) => {
  // Initialize the debounced value with the input value
  const [debounced, setDebounced] = useState<T>(inputValue);

  // Use the useEffect hook to create a timeout that updates the debounced value
  useEffect(() => {
    // Create a timeout that updates the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebounced(inputValue);
    }, delay);

    // Return a cleanup function that clears the timeout when the effect is re-run
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]); // Only re-run the effect when inputValue or delay changes

  // Return the debounced value
  return debounced;
};
