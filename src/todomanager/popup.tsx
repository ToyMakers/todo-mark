import Detail from './detail';
import TodoList from './TodoList';

function Popup() {
  return (
    <div>
      <div className="w-32 h-10">
        <h1>투두막</h1>
      </div>
      <TodoList />
      <Detail />
    </div>
  );
}

export default Popup;
