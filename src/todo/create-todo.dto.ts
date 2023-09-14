import { TodoStatus } from "./todo-status.enum";

export class CreateTodoDto{
    title: string;
    description: string;
    status: TodoStatus;
    dueDate?: Date;
}