import { useEffect } from 'react';

function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return () => window.removeEventListener(type, listener, options);
  }, []);
}

export default useEventListener;
