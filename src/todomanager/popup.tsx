import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createDB, addToDB } from '../db/dbManager';

interface Todo {
  id: string;
  title: string;
  content: string;
  dueDate?: Date;
  isComplete: boolean;
}

function Popup() {
  (async () => {
    try {
      const db = await createDB();
      console.log('데이터베이스 연결 성공:', db);
    } catch (error) {
      console.error('데이터베이스 연결 실패:', error);
    }
  })();
  // TODO : 데이터를 indexedDB에 저장하고 관리할 수 있도록 작업 예정
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{
    id: string;
    content: string;
  } | null>(null);

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
          title: newTodo,
          content: newTodo,
          dueDate: undefined,
          isComplete: false,
        },
      ]);
      addToDB({
        id: uuidv4(),
        title: newTodo,
        content: newTodo,
        isComplete: false,
      });
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

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTodo) {
      setEditTodo({ ...editTodo, content: e.target.value });
    }
  };
  const startEditTodo = (todo: Todo) => {
    setEditTodo({ id: todo.id, content: todo.content });
  };

  const saveEditTodo = () => {
    if (editTodo) {
      setTodos(
        todos.map(todo =>
          todo.id === editTodo.id
            ? { ...todo, content: editTodo.content }
            : todo,
        ),
      );
      setEditTodo(null);
    }
  };

  return (
    <div className="text-[13px] p-2">
      <div className="w-80 h-10">
        <h1 className="text-[13px]">투두막</h1>
      </div>
      <div className="flex-col w-full ">
        <div className="max-w-80 h-52 overflow-y-auto">
          {todos.map(todo => (
            <div key={todo.id} className="flex justify-between my-1">
              <input
                type="checkbox"
                checked={todo.isComplete}
                value={todo.id}
                onChange={completeTodo}
              />
              {editTodo?.id === todo.id ? (
                <input
                  type="text"
                  value={editTodo.content}
                  onChange={handleEditTodo}
                  className="border rounded px-1"
                />
              ) : (
                <div className="w-40 text-left break-words whitespace-normal">
                  {todo.content}
                </div>
              )}

              <div className="flex items-center gap-2">
                {editTodo?.id === todo.id ? (
                  <button
                    type="button"
                    onClick={saveEditTodo}
                    className="text-green-500"
                  >
                    저장
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEditTodo(todo)}
                    className="text-blue-500"
                  >
                    수정
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-80 flex justify-between">
          <input
            value={newTodo}
            onChange={handleNewTodo}
            type="text"
            placeholder="할 일을 입력하세요."
            className="w-64"
          />
          <button type="submit" onClick={() => addTodo()}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
