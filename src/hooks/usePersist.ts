import { useEffect, useRef, useState } from 'react';
import { UsePersist } from '../lib/types';
import useEventListener from './useEventListener';

function usePersist<T>(init: T, key: string): UsePersist<T> {
  const [state, setState] = useState(init);
  const stateRef = useRef(state);

  useEventListener('beforeunload', handleUnload);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (value) {
      setState(JSON.parse(value) as T);
    }
  }, []);

  function handleUnload() {
    setStorage(stateRef.current);
  }

  function setStorage(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function reset() {
    setState(init);
    setStorage(init);
  }

  return [state, setState, reset];
}

export default usePersist;
