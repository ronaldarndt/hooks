import { useState } from 'react';

function useToggle(init?: boolean): [boolean, () => void] {
  const [state, setState] = useState(init ?? false);

  function toggle() {
    setState(s => !s);
  }

  return [state, toggle];
}

export default useToggle;
