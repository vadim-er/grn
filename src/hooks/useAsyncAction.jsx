import { useState, useCallback } from "react";

export function useAsyncAction(asyncFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFn(...args);
        return result;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn],
  );

  return { run, isLoading, isError: !!error, error };
}

export default useAsyncAction;
