import { useState } from 'react';

function Popup() {
  const Alert = alert;
  // 임시로 useState로 데이터 저장 [indexedDB로 데이터를 저장하고 불러올 수 있게 작업 예정]
  const [todos, setTodos] = useState([
    {
      id: 0,
      content: '할 일 1',
      dueDate: new Date().toISOString().split('T')[0],
      done: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState('');

  // 임시로 id값은 배열의 길이로 설정
  const addTodo = () => {
    if (typeof newTodo === 'string' && newTodo.length > 0) {
      setTodos([
        ...todos,
        {
          id: todos.length,
          content: newTodo,
          dueDate: new Date().toISOString().split('T')[0],
          done: false,
        },
      ]);
      setNewTodo('');
    } else {
      Alert('할 일을 입력하세요.');
    }
  };

  const completeTodo = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      }),
    );
    todos.forEach(todo => {
      if (todo.id === id && !todo.done) {
        Alert(`${todo.content} 완료!`);
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
                checked={todo.done}
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
