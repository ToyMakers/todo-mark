import TodoList from './TodoList';

function Popup() {
  return (
    <div className="p-2">
      <div className="w-80 h-10">
        <h1 className="text-sm">투두막</h1>
      </div>
      <TodoList />
    </div>
  );
}

export default Popup;
