import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, getAllTodos, deleteTodo, updateTodo } from '../db/dbManager';

interface TodoListProps {
  onSelectTodo: (id: string, view: string) => void;
}

function TodoList({ onSelectTodo }: TodoListProps) {
  const [todoFromDB, setTodoFromDB] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoContent = e.target.value;
    setNewTodo(newTodoContent);
  };

  const getTodosFromDB = async () => {
    const todos = await getAllTodos();
    setTodoFromDB(
      todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
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
        todoDetail: { description: '' },
      };
      addTodo(newTodoItem);
      setNewTodo('');
    }
  };

  const handleCompleteTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    todoFromDB.forEach(todo => {
      if (todo.id === id) {
        updateTodo({
          ...todo,
          isComplete: e.target.checked,
        });
      }
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleEditTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTodo) {
      setEditTodo({ ...editTodo, title: e.target.value });
    }
  };

  const handleStartEditTodo = (id: string) => {
    const editTodoItem = todoFromDB.find(todo => todo.id === id);
    if (editTodoItem) {
      setEditTodo({ ...editTodoItem });
    }
  };

  const handleSaveEditTodo = (id: string) => {
    const saveTodo = todoFromDB.find(todo => todo.id === id);
    if (saveTodo && editTodo) {
      updateTodo({
        ...saveTodo,
        title: editTodo.title,
      });
      setEditTodo(null);
    }
  };

  useEffect(() => {
    getTodosFromDB();
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
                <button
                  type="button"
                  onClick={() => onSelectTodo(todo.id, 'detail')}
                  className="w-40 text-left break-words whitespace-normal"
                >
                  {todo.title}
                </button>
              )}

              <div className="flex items-center gap-2">
                {editTodo?.id === todo.id ? (
                  <button
                    type="button"
                    onClick={() => handleSaveEditTodo(editTodo.id)}
                    className="text-green-500"
                  >
                    저장
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartEditTodo(todo.id)}
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

export default TodoList;
