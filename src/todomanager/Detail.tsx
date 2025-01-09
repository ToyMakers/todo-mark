import { useEffect, useState } from 'react';
import ReactMarkDown from 'react-markdown';
import 'github-markdown-css/github-markdown-light.css';
import remarkGfm from 'remark-gfm';
import { getTodobyId, updateTodo } from '../db/dbManager';
import calculateDday from '../utils/utils';

function Detail({ id, onBack }: { id: string; onBack: () => void }) {
  const [isModify, setIsModify] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const fetchTodo = async () => {
    const result = await getTodobyId(id);
    setSelectedTodo(result);
  };

  const handleIsModify = () => {
    setIsModify(!isModify);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (selectedTodo) {
      setSelectedTodo({
        ...selectedTodo,
        [name]: value,
        [name]: name === 'isComplete' ? checked : value,
        [name]: name === 'dueDate' ? new Date(value) : value,
      });
      updateTodo({
        ...selectedTodo,
        [name]: name === 'isComplete' ? checked : value,
      });
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (selectedTodo) {
      setSelectedTodo({
        ...selectedTodo,
        todoDetail: {
          ...selectedTodo.todoDetail,
          [name]: value,
        },
      });
      updateTodo({
        ...selectedTodo,
        todoDetail: {
          ...selectedTodo.todoDetail,
          [name]: value,
        },
      });
    }
  };

  const handleImportance = () => {
    if (selectedTodo) {
      const newImportance = !selectedTodo.todoDetail.importance;

      setSelectedTodo({
        ...selectedTodo,
        todoDetail: { ...selectedTodo.todoDetail, importance: newImportance },
      });

      updateTodo({
        ...selectedTodo,
        todoDetail: {
          ...selectedTodo.todoDetail,
          importance: newImportance,
        },
      });
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

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
              <div className="flex items-center gap-2 h-transparent">
                <button
                  type="button"
                  aria-label="importance"
                  className="border-none outline-none bg-transparent text-center"
                  onClick={() => handleImportance()}
                >
                  {!selectedTodo?.todoDetail.importance ? (
                    <div className="relative w-6 h-8 bg-gray-300 text-white rounded-md shadow-md">
                      <div className="absolute -bottom-2 left-0 right-0 mx-auto w-0 h-0 border-t-[12px] border-t-gray-300 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent" />
                    </div>
                  ) : (
                    <div className="relative w-6 h-8 bg-orange-500 text-white rounded-md shadow-md">
                      <div className="absolute -bottom-2 left-0 right-0 mx-auto w-0 h-0 border-t-[12px] border-t-orange-500 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent" />
                    </div>
                  )}
                </button>
              </div>

              <div className="text-sm text-gray-600">
                {selectedTodo?.dueDate && (
                  <div>{calculateDday(selectedTodo?.dueDate)}</div>
                )}
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
              <div className="flex">
                <input
                  type="text"
                  name="title"
                  value={selectedTodo?.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-40"
                />
                <div className="flex items-center gap-2 h-transparent">
                  <button
                    type="button"
                    aria-label="importance"
                    className="border-none outline-none bg-transparent text-center"
                    onClick={() => handleImportance()}
                  >
                    {!selectedTodo?.todoDetail.importance ? (
                      <div className="relative w-6 h-8 bg-gray-300 text-white rounded-md shadow-md">
                        <div className="absolute -bottom-2 left-0 right-0 mx-auto w-0 h-0 border-t-[12px] border-t-gray-300 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent" />
                      </div>
                    ) : (
                      <div className="relative w-6 h-8 bg-orange-500 text-white rounded-md shadow-md">
                        <div className="absolute -bottom-2 left-0 right-0 mx-auto w-0 h-0 border-t-[12px] border-t-orange-500 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent" />
                      </div>
                    )}
                  </button>
                </div>
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
                value={selectedTodo?.dueDate?.toISOString().split('T')[0]}
                onChange={handleInputChange}
                className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-28 "
              />
            </div>
          )}
        </div>
      </section>
      <section>
        {!isModify ? (
          <>
            <div>
              <ReactMarkDown
                className="markdown-body"
                remarkPlugins={[remarkGfm]}
              >
                {selectedTodo?.todoDetail.description}
              </ReactMarkDown>
            </div>
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
              onChange={handleTextAreaChange}
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
