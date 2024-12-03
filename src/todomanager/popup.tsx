import { useState } from 'react';
import Detail from './detail';

function Popup() {
  const [selectedId, setSelectedId] = useState('');
  const [currentView, setCurrentView] = useState('list');

  const handleSelectTodo = (id: string, view: string) => {
    setSelectedId(id);
    setCurrentView(view);
  };

  const handleBack = () => {
    setSelectedId('');
    setCurrentView('list');
  };

  return (
    <div className="p-2">
      <div className="w-80 h-10">
        {currentView === 'list' && <TodoList onSelectTodo={handleSelectTodo} />}
        {currentView === 'detail' && (
          <Detail id={selectedId} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

export default Popup;
