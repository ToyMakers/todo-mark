import { useState } from 'react';

function Detail() {
  const [isModify, setIsModify] = useState(false);

  const handleIsModify = () => {
    setIsModify(!isModify);
  };

  return (
    <div>
      <div>
        <div>
          {!isModify ? (
            <div className="flex-col ">
              <section className="flex justify-between align-middle">
                <div className="w-52 h-10 flex align-middle text-lg">
                  투두 제목 보이기
                </div>
                <div className="w-52 h-10">
                  <input type="checkbox" className="custom-checkbox" />
                </div>
              </section>
              <div className="w-52 h-10"> 세부 내용 </div>
              <div className="w-52 h-10"> 마감 날짜</div>
              <button type="button" onClick={() => handleIsModify()}>
                수정
              </button>
            </div>
          ) : (
            <div className="flex-col">
              <section className="flex justify-between align-middle">
                <div className="w-52 h-10 flex align-middle text-lg">
                  투두 제목 보이기
                </div>
                <div className="w-52 h-10">
                  <input type="checkbox" className="custom-checkbox" />
                </div>
              </section>
              <div className="w-52 h-10" />
              <div className="w-52 h-10">
                <input type="date" />
              </div>
              <button type="button" onClick={() => handleIsModify()}>
                저장
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
