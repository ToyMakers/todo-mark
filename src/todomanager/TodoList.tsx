import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

interface Todo {
  id: string;
  content: string;
  dueDate?: Date;
  isComplete: boolean;
}

function TodoList() {
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
      <div className="flex-col w-32 h-32">
        <div id="todo-list" className=" h-16 overflow-y-scroll">
          {todos.map(todo => (
            <div key={todo.id} className="flex">
              <div>{todo.content}</div>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={completeTodo}
              />
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            id="todo-input"
            value={newTodo}
            onChange={handleNewTodo}
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

export default TodoList;