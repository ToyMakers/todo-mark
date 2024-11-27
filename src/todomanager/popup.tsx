import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  content: string;
  dueDate?: Date;
  isComplete: boolean;
}

function Popup() {
  // TODO : 데이터를 indexedDB에 저장하고 관리할 수 있도록 작업 예정
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoContent = e.target.value;
    setNewTodo(newTodoContent);
  };

  const addTodo = () => {
    if (typeof newTodo === 'string' && newTodo.length > 0) {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          content: newTodo,
          dueDate: undefined,
          isComplete: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const completeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  };

  return (
    <div>
      <div className="w-32 h-10">
        <h1>투두막</h1>
      </div>
      <div className="flex-col w-32 h-32">
        <div className=" h-16 overflow-y-scroll">
          {todos.map(todo => (
            <div key={todo.id} className="flex">
              <div>{todo.content}</div>
              <input
                type="checkbox"
                checked={todo.isComplete}
                value={todo.id}
                onChange={completeTodo}
              />
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            value={newTodo}
            onChange={handleNewTodo}
            type="text"
            placeholder="할 일을 입력하세요."
          />
        </div>
        <button type="submit" onClick={() => addTodo()}>
          추가
        </button>
      </div>
    </div>
  );
}

export default Popup;
