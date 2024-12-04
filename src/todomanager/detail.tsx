import { useEffect, useState } from 'react';
import { getTodobyId, updateTodo } from '../db/dbManager';
import { Todo } from '../db/todoSchemas';

function Detail({ id, onBack }: { id: string; onBack: () => void }) {
  const [isModify, setIsModify] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  useEffect(() => {
    const fetchTodo = async () => {
      const result = (await getTodobyId(id)) as Todo;
      setSelectedTodo(result);
    };

    fetchTodo();
  }, [id]);

  const handleIsModify = () => {
    setIsModify(!isModify);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    // const { checked } = e.target as HTMLInputElement;

    if (selectedTodo) {
      setSelectedTodo(prevTodo => {
        if (!prevTodo) return prevTodo;
        if (name !== 'description') {
          return {
            ...prevTodo,
            [name]: value,
          };
        }
        return {
          ...prevTodo,
          todoDetail: {
            ...prevTodo.todoDetail,
            [name]: value,
          },
        };
      });
      updateTodo(selectedTodo);
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      <section className="flex justify-between items-center w-full">
        <button
          type="button"
          onClick={onBack}
          className="bg-brown-500 text-white rounded px-4 py-2 hover:bg-brown-600"
        >
          목록
        </button>
        <div className="flex justify-center items-center space-y-2 w-full">
          {!isModify ? (
            <div className="flex justify-around items-center space-x-2 w-full">
              <div className="text-lg">{selectedTodo?.title}</div>
              <div className="text-sm text-gray-600">
                {selectedTodo?.dueDate?.toLocaleDateString()}
              </div>
              <input
                type="checkbox"
                name="isComplete"
                checked={selectedTodo?.isComplete}
                onChange={handleInputChange}
                className="w-5 h-5 items-center align-middle custom-checkbox"
              />
            </div>
          ) : (
            <div className="flex-col justify-around items-center space-x-2 w-full">
              <div className="felx">
                <input
                  type="text"
                  name="title"
                  value={selectedTodo?.title}
                  onChange={handleInputChange}
                  defaultValue={selectedTodo?.title}
                  className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-40"
                />
                <input
                  type="checkbox"
                  name="isComplete"
                  onChange={handleInputChange}
                  checked={selectedTodo?.isComplete}
                  className="w-5 h-5 items-center align-middle custom-checkbox"
                />
              </div>
              <input
                type="date"
                name="dueDate"
                value={selectedTodo?.dueDate?.toString()}
                onChange={handleInputChange}
                defaultValue={selectedTodo?.dueDate?.toString()}
                className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-28 "
              />
            </div>
          )}
        </div>
      </section>
      <section>
        {!isModify ? (
          <>
            <div>{selectedTodo?.todoDetail.description}</div>
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
              value={selectedTodo?.todoDetail.description}
              name="description"
              onChange={handleInputChange}
              defaultValue={selectedTodo?.todoDetail.description}
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
