import { useState } from 'react';
import Detail from './detail';
import TodoList from './TodoList';

// interface Todo {
//   id: string;
//   content: string;
//   isComplete: boolean;
// }

function Popup() {
  const [selectedId, setSelectedId] = useState('');

  const handleSelectTodo = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div>
      <div className="w-32 h-10">
        <h1>투두막</h1>
      </div>
      <TodoList onSelectTodo={handleSelectTodo} />

      <Detail id={selectedId} />
    </div>
  );
}

export default Popup;
