import { useRef } from 'react';

function useDebounce<T>(handler: (arg?: T) => void, timeout: number = 1000) {
  const timeoutRef = useRef<number>();

  return function (arg?: T) {
    window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => handler(arg), timeout);
  };
}

export default useDebounce;
