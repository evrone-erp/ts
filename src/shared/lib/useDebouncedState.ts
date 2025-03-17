import { startTransition, useCallback, useRef, useState } from 'react';

/**
 * like useState(), but calls to setState() are debounced
 * @param initialValue
 * @param delay
 */
export const useDebouncedState = <T>(initialValue: T, delay: number = 500) => {
  const [value, setValue] = useState(initialValue);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const timeoutRef = useRef<number | undefined>();

  const seValueDebounced = useCallback(
    (nextValue: T) => {
      startTransition(() => {
        setIsDebouncing(true);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        startTransition(() => {
          setValue(nextValue);
          setIsDebouncing(false);
        });
      }, delay);
    },
    [delay],
  );

  return [value, seValueDebounced, isDebouncing] as const;
};
