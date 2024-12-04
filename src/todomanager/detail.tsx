import { useEffect, useState } from 'react';
import { getTodobyId } from '../db/dbManager';
import { Todo } from '../db/todoSchemas';

function Detail({ id, onBack }: { id: string; onBack: () => void }) {
  const [isModify, setIsModify] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  // const [title, setTitle] = useState('');
  // const [dueDate, setDueDate] = useState();
  // const [isComplete, setIsComplete] = useState(false);
  // const [description, setDescription] = useState('');

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

  // const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // };

  // const handleDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDueDate(e.target.value);
  // };

  // const handleIsComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsComplete(e.target.checked);
  // };

  // const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setDescription(e.target.value);
  // };

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
                {selectedTodo?.dueDate}
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 items-center align-middle custom-checkbox"
              />
            </div>
          ) : (
            <div className="flex justify-around items-center space-x-2 w-full">
              <input
                type="text"
                defaultValue={selectedTodo?.title}
                className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-40"
              />
              <input
                type="date"
                defaultValue={selectedTodo?.dueDate}
                className="border border-gray-300 focus:ring-2 focus:ring-brown-400 focus:outline-none rounded p-2 text-sm w-28 "
              />
              <input
                type="checkbox"
                checked={selectedTodo?.isComplete}
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
