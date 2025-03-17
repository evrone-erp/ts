import { RefCallback, useRef } from 'react';

export function useScrollToCurrent() {
  const initialScrolledRef = useRef(false);
  const scrollToCurrent: RefCallback<HTMLTableElement> = (el) => {
    if (initialScrolledRef.current) return;
    const currentDay = el?.querySelector(`th[data-current='true']`);
    currentDay?.scrollIntoView({
      inline: 'center',
    });
    initialScrolledRef.current = !!currentDay;
  };

  return scrollToCurrent;
}
