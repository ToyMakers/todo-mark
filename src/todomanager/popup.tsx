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
  const [currentView, setCurrentView] = useState('list');

  const handleSelectTodo = (id: string, view: string) => {
    setSelectedId(id);
    setCurrentView(view);
  };

  return (
    <div>
      <div className="w-32 h-10">
        <h1>투두막</h1>
      </div>
      {currentView === 'list' && <TodoList onSelectTodo={handleSelectTodo} />}
      {currentView === 'detail' && <Detail id={selectedId} />}
    </div>
  );
}

export default Popup;
