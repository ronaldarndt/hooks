import React, { useState } from 'react';
import useDebounce from '../src/hooks/useDebounce';
import usePersist from '../src/hooks/usePersist';
import useToggle from '../src/hooks/useToggle';

interface Todo {
  id: number;
  text: string;
}

function getId() {
  return Math.random() * 200 + 1;
}

function App() {
  const [count, setCount, reset] = usePersist(0, 'count');
  const [txt, setTxt] = useState('');
  const [list, setList] = usePersist<Array<Todo>>([], 'list');
  const [typing, setTyping] = useState(false);
  const [onOff, toggleOnOff] = useToggle();
  const debounce = useDebounce(() => setTyping(false), 1000);

  function add() {
    setList(l => [...l, { id: getId(), text: txt }]);
    setTxt('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <button onClick={() => setCount(c => c + 1)}>add</button>
        {count}

        <button onClick={reset}>reset</button>
      </div>

      <button onClick={toggleOnOff}>{onOff ? 'on' : 'off'}</button>

      <div>
        <input
          value={txt}
          onChange={e => {
            setTxt(e.target.value);
            setTyping(true);
            debounce();
          }}
        ></input>
        <button onClick={add}>add</button>
        {typing ? 'user is typing' : 'not typing'}
      </div>

      <ul>
        {list.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
