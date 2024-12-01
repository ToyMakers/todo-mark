import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { addToDB, getAllTodos } from '../db/dbManager';

interface Todo {
  id: string;
  title: string;
  content: string;
  dueDate?: Date;
  isComplete: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{
    id: string;
    content: string;
  } | null>(null);

  const [todoFromDB, setTodoFromDB] = useState<Todo[]>([]);

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoContent = e.target.value;
    setNewTodo(newTodoContent);
  };

  const getTodosFromDB = async () => {
    const todoList = await getAllTodos();
    setTodoFromDB(
      todoList.map(todo => ({
        id: todo.id,
        title: todo.title || '',
        content: todo.content || '',
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        isComplete: todo.isComplete,
      })),
    );
  };

  const fetchTodos = async () => {
    await getTodosFromDB();
  };

  const handleAddTodo = () => {
    if (typeof newTodo === 'string' && newTodo.length > 0) {
      const newTodoItem = {
        id: uuidv4(),
        title: newTodo,
        content: newTodo,
        dueDate: undefined,
        isComplete: false,
      };
      setTodos(prevTodos => [...prevTodos, newTodoItem]);
      addToDB(newTodoItem);
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
      setEditTodo({ ...editTodo, content: e.target.value });
    }
  };
  const handleStartEditTodo = (todo: Todo) => {
    setEditTodo({ id: todo.id, content: todo.content });
  };

  const handleSaveEditTodo = () => {
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

  useEffect(() => {
    fetchTodos();
  }, [todoFromDB]);

  return (
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
  );
}

export default TodoList;
