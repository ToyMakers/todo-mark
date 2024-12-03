import { useState } from 'react';
import Detail from './detail';

function Popup() {
  const [selectedId, setSelectedId] = useState('');

  const handleSelectTodo = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="p-2">
      <div className="w-80 h-10">
        <h1 className="text-sm">투두막</h1>
      </div>
      <TodoList onSelectTodo={handleSelectTodo} />

      <Detail id={selectedId} />
    </div>
  );
}

export default Popup;
