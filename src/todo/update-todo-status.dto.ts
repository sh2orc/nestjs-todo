import { IsEnum, IsNotEmpty } from "class-validator";
import { TodoStatus } from "./todo-status.enum";

export class UpdateTodoStatusDto{
    @IsNotEmpty()
    @IsEnum(TodoStatus)
    status: TodoStatus;
}