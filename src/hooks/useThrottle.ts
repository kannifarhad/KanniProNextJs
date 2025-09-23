import { useRef, useCallback } from "react";

/**
 * Throttle a function call so it runs at most once per delay period.
 * @param fn The function to throttle
 * @param delay Delay in milliseconds
 */
export function useThrottle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCall = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current < delay) return;

      lastCall.current = now;
      fn(...args);
    },
    [fn, delay]
  );
}

export default useThrottle;
