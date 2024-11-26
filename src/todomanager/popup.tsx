import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  content: string;
  isComplete: boolean;
}

function Popup() {
  // TODO : 데이터를 indexedDB에 저장하고 관리할 수 있도록 작업 예정
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (typeof newTodo === 'string' && newTodo.length > 0) {
      setTodos([
        ...todos,
        { id: uuidv4(), content: newTodo, isComplete: false },
      ]);
      setNewTodo('');
    }
  };

  const completeTodo = (id: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      }),
    );
    todos.forEach(todo => {
      if (todo.id === id && !todo.isComplete) {
        alert(`${todo.content} 완료!`);
      }
    });
  };

  return (
    <div>
      <div className="w-32 h-10">
        <h1>투두막</h1>
      </div>
      <div className="flex-col w-32 h-32">
        <div id="todo-list" className=" h-16 overflow-y-scroll">
          {todos.map(todo => (
            <div key={todo.id} className="flex">
              <div>{todo.content}</div>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => completeTodo(todo.id)}
              />
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            id="todo-input"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            type="text"
            placeholder="할 일을 입력하세요."
          />
        </div>
        <button id="add-todo" type="submit" onClick={() => addTodo()}>
          추가
        </button>
      </div>
    </div>
  );
}

export default Popup;
