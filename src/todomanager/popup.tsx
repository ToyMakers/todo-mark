import { useState } from 'react';
import Detail from './detail';

function Popup() {
  const [selectedId, setSelectedId] = useState('');
  const [currentView, setCurrentView] = useState('list');

  const handleSelectTodo = (id: string, view: string) => {
    setSelectedId(id);
    setCurrentView(view);
  };

  return (
    <div className="p-2">
      <div className="w-80 h-10">
        <h1 className="text-sm">투두막</h1>
      </div>
      {currentView === 'list' && <TodoList onSelectTodo={handleSelectTodo} />}
      {currentView === 'detail' && <Detail id={selectedId} />}
    </div>
  );
}

export default Popup;
