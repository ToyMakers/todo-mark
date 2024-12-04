export interface Todo {
  id: string;
  title: string;
  dueDate?: string;
  isComplete: boolean;
  todoDetail: TodoDetail;
}

export interface TodoDetail {
  description: string;
}
