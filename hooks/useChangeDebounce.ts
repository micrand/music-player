import { useEffect, useRef } from 'react';

type Props<T> = {
  callback: () => void;
  input: T;
  trackChange: (prevValue: T | null, currValue: T) => boolean;
  delay?: number;
};

export const useChangeDebounce = <T>({ callback, trackChange, input, delay = 500 }: Props<T>) => {
  const prevRef = useRef<T>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (trackChange(prevRef.current, input)) {
        callback();
      }
      prevRef.current = input;
    }, delay);
    return () => clearTimeout(timer);
  }, [input, delay]);
};
