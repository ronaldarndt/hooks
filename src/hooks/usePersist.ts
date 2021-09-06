import { useEffect, useRef, useState } from 'react';
import { UsePersist } from '../lib/types';

function usePersist<T>(init: T, key: string): UsePersist<T> {
  const [state, setState] = useState(init);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (value) {
      const v = JSON.parse(value);

      setState(v as T);
    }

    window.addEventListener('beforeunload', handleUnload);

    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  function handleUnload() {
    setStorage(stateRef.current);
  }

  function setStorage(value: T) {
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  function reset() {
    setState(init);
    setStorage(init);
  }

  return [state, setState, reset];
}

export default usePersist;
