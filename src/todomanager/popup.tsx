// import { useState } from 'react';
// import TodoList from './todo';
import Detail from './detail';

// interface Todo {
//   id: string;
//   content: string;
//   isComplete: boolean;
// }

function Popup() {
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <div className="p-2">
      <div className="w-80 h-10">
        <h1 className="text-sm">투두막</h1>
      </div>
      <Detail />
      {/* {selectedTodo ? <Detail /> : <TodoList />} */}
    </div>
  );
}

export default Popup;
