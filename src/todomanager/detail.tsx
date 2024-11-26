import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TodoDetail {
  id: string;
  content: string;
  detail: string;
  dueDate: string;
  isComplete: boolean;
}

function Detail() {
  const [todos, setTodos] = useState<TodoDetail[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const [isModifyTitle, setIsModifyTitle] = useState(false);

  const addTodo = () => {
    if (newTodo && newDetail && newDueDate) {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          content: newTodo,
          detail: newDetail,
          dueDate: newDueDate,
          isComplete: false,
        },
      ]);
      setNewTodo('');
      setNewDetail('');
      setNewDueDate('');
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
  };

  return (
    <div>
      <div>
        <h1>디테일</h1>
        <div>
          {todos.map(todo => (
            <div key={todo.id}>
              <div>{todo.content}</div>
              <div>{todo.detail}</div>
              <div>{todo.dueDate}</div>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => completeTodo(todo.id)}
              />
              <button>수정</button>
            </div>
          ))}
        </div>
        <div>
          {!isModifyTitle ? (
            <div>
              <p>할 일 제목</p>
              <button onClick={() => setIsModifyTitle(true)}>수정</button>
            </div>
          ) : (
            <div>
              <input
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                type="text"
                placeholder="할 일을 입력하세요."
              />
              <button onClick={() => setIsModifyTitle(false)}>완료</button>
            </div>
          )}
          <input
            value={newDetail}
            onChange={e => setNewDetail(e.target.value)}
            type="text"
            placeholder="세부 내용을 입력하세요."
          />
          <input
            value={newDueDate}
            onChange={e => setNewDueDate(e.target.value)}
            type="date"
          />
          <button onClick={addTodo}>추가</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
