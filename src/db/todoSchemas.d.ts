export interface Todo {
  id: string;
  title: string;
  dueDate?: Date;
  isComplete: boolean;
  todoDetail: TodoDetail;
}

export interface TodoDetail {
  description: string;
}
