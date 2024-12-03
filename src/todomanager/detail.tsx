import { useEffect, useState } from 'react';
import { getTodobyId } from '../db/dbManager';

interface Todo {
  id: string;
  title: string;
  dueDate?: string;
  isComplete: boolean;
  todoDetail: TodoDetail;
}

interface TodoDetail {
  description: string;
}

function Detail({ id }: { id: string }) {
  const [isModify, setIsModify] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  useEffect(() => {
    const fetchTodo = async () => {
      const result = (await getTodobyId(id)) as Todo;
      console.log(result);
      setSelectedTodo(result);
    };

    fetchTodo();
  }, [id]);

  const handleIsModify = () => {
    setIsModify(!isModify);
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      <section className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center space-y-2 w-full">
          {!isModify ? (
            <div className="flex justify-around items-center space-x-2 w-full">
              <div className="text-lg">{selectedTodo?.title}</div>
              <div className="text-sm text-gray-600">D-13[예시]</div>
              <input
                type="checkbox"
                className="w-5 h-5 items-center align-middle custom-checkbox"
              />
            </div>
          ) : (
            <div className="flex justify-around items-center space-x-2 w-full">
              <input
                type="text"
                defaultValue="투두 제목 보이기"
                className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-40"
              />
              <input
                type="date"
                className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-28 "
              />
              <input
                type="checkbox"
                className="w-5 h-5 items-center align-middle custom-checkbox"
              />
            </div>
          )}
        </div>
      </section>
      <section>
        {!isModify ? (
          <>
            <div className="h-32" />
            <button
              type="button"
              onClick={() => handleIsModify()}
              className="bg-brown-500 text-white rounded px-4 py-2 hover:bg-brown-600"
            >
              수정
            </button>
          </>
        ) : (
          <>
            <textarea
              className="w-full h-32 p-2 border border-brown-400 rounded resize-none focus:ring-2 focus:ring-brown-400 focus:outline-none"
              defaultValue="세부 내용"
            />
            <button
              type="button"
              onClick={() => handleIsModify()}
              className="bg-brown-500 text-white rounded px-4 py-2 hover:bg-brown-600"
            >
              저장
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export default Detail;
