function Popup() {
  const todos = [
    { id: 1, text: '할 일 1', done: false },
    { id: 2, text: '할 일 2', done: false },
  ];
  return (
    <div>
      <div className="w-32 h-10">
        <h1>투두막</h1>
      </div>
      <div>
        <div id="todo-list" className="flex-col w-32 h-64 overflow-y-scroll">
          {todos.map(todo => (
            <div key={todo.id} className="flex">
              <input type="checkbox" />
              <div>{todo.text}</div>
            </div>
          ))}
        </div>
        <div>
          <input
            id="todo-input"
            type="text"
            placeholder="할 일을 입력하세요."
          />
          <button id="add-todo">추가</button>
        </div>
      </div>
      <script src="popup.js" />
    </div>
  );
}

export default Popup;
