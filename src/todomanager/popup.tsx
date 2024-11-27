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
  const [editTodoId, setEditTodoId] = useState<string | null>(null); // 수정 중인 투두의 ID
  const [editTodoContent, setEditTodoContent] = useState(''); // 수정 중인 내용

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

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoContent(e.target.value);
  };

  const startEditTodo = (id: string, content: string) => {
    setEditTodoId(id);
    setEditTodoContent(content);
  };

  const saveEditTodo = () => {
    if (editTodoId && editTodoContent.length > 0) {
      setTodos(
        todos.map(todo =>
          todo.id === editTodoId ? { ...todo, content: editTodoContent } : todo,
        ),
      );
      setEditTodoId(null);
      setEditTodoContent('');
    }
  };

  return (
    <div className="text-[13px]">
      <div className="max-w-80 w-80 h-10">
        <h1 className="text-[13px]">투두막</h1>
      </div>
      <div className="flex-col w-full ">
        <div className="max-w-80 h-[200px] overflow-y-auto">
          {todos.map(todo => (
            <div key={todo.id} className="flex justify-between my-1">
              <input
                type="checkbox"
                checked={todo.isComplete}
                value={todo.id}
                onChange={completeTodo}
              />
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={editTodoContent}
                  onChange={handleEditTodoContent}
                  className="border rounded px-1"
                />
              ) : (
                <div className="max-w-40 text-ellipsis">{todo.content}</div>
              )}

              <div className="flex items-center gap-2">
                {editTodoId === todo.id ? (
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
                    onClick={() => startEditTodo(todo.id, todo.content)}
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
        <div className="max-w-80 w-80 flex justify-between">
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
