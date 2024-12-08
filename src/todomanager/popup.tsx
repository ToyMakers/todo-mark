import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, getAllTodos } from '../db/dbManager';

function Popup() {
  // [FIX ME] 데이터 베이스 저장소의 삭제, 수정 기능이 구현되면 todos를 사용하지 않고 todoFromDB를 사용해야 합니다.
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [todoFromDB, setTodoFromDB] = useState<Todo[]>([]);

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoContent = e.target.value;
    setNewTodo(newTodoContent);
  };

  const saveTodosFromDB = async () => {
    const todoList = await getAllTodos();
    setTodoFromDB(
      todoList.map(todo => ({
        id: todo.id,
        title: todo.title,
        dueDate: todo.dueDate,
        isComplete: todo.isComplete,
        todoDetail: todo.todoDetail,
      })),
    );
  };

  const handleAddTodo = () => {
    if (typeof newTodo === 'string' && newTodo.length > 0) {
      const newTodoItem = {
        id: uuidv4(),
        title: newTodo,
        dueDate: undefined,
        isComplete: false,
        todoDetail: {
          description: '',
        },
      };
      setTodos(prevTodos => [...prevTodos, newTodoItem]);
      addTodo(newTodoItem);
      setNewTodo('');
    }
  };

  const handleCompleteTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTodo) {
      setEditTodo({ ...editTodo, title: e.target.value });
    }
  };
  const handleStartEditTodo = (todo: Todo) => {
    setEditTodo({ id: todo.id, title: todo.title });
  };

  const handleSaveEditTodo = () => {
    if (editTodo) {
      setTodos(
        todos.map(todo =>
          todo.id === editTodo.id ? { ...todo, title: editTodo.title } : todo,
        ),
      );
      setEditTodo(null);
    }
  };

  useEffect(() => {
    saveTodosFromDB();
  }, [todoFromDB]);

  return (
    <div className="p-2">
      <div className="w-80 h-10">
        <h1 className="text-sm">투두막</h1>
      </div>
      <div className="flex-col w-full ">
        <div className="max-w-80 h-52 overflow-y-auto">
          {todoFromDB.map(todo => (
            <div key={todo.id} className="flex justify-between my-1">
              <input
                type="checkbox"
                checked={todo.isComplete}
                value={todo.id}
                onChange={handleCompleteTodo}
              />
              {editTodo?.id === todo.id ? (
                <input
                  type="text"
                  value={editTodo.title}
                  onChange={handleEditTodo}
                  className="border rounded px-1"
                />
              ) : (
                <div className="w-40 text-left break-words whitespace-normal">
                  {todo.title}
                </div>
              )}

              <div className="flex items-center gap-2">
                {editTodo?.id === todo.id ? (
                  <button
                    type="button"
                    onClick={handleSaveEditTodo}
                    className="text-green-500"
                  >
                    저장
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartEditTodo(todo)}
                    className="text-blue-500"
                  >
                    수정
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
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
          <button type="submit" onClick={handleAddTodo}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
