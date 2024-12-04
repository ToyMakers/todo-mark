interface Todo {
  id: string;
  title: string;
  dueDate?: Date;
  isComplete: boolean;
  todoDetail: TodoDetail;
}

interface TodoDetail {
  description: string;
}
