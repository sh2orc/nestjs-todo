import { TodoStatus } from "./todo-status.enum";

export class SearchTodoDto {
    status?: TodoStatus;
    search?: Date;
}