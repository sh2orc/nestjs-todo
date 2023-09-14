import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';
import { SearchTodoDto } from './search-todo.dto';
import { TodoStatus } from './todo-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TodoService {

    constructor(private todoRepository: TodoRepository) {}

    async getTodos(searchTodoDto: SearchTodoDto): Promise<Todo[]> {
        return this.todoRepository.getTodos(searchTodoDto);
    }

    async getTodoById(id: string): Promise<Todo> {
        return this.todoRepository.findOne({where : {id: id}});
    }

    async updateTaskStatusById(id: string, status: TodoStatus): Promise<Todo> {
        const todo: Todo = await this.getTodoById(id);
        if(!todo){
            throw new NotFoundException(`Todo with ID "${id}" not found`);
        }
        todo.status = status;
        await this.todoRepository.save(todo);
        return todo;
    }

    async deleteTodoById(id: string): Promise<void> {
        const result = await this.getTodoById(id);
        if(!result){
            throw new NotFoundException(`Todo with ID "${id}" not found`);
        }
        this.todoRepository.delete(id);
    }

    async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
        const { title, description, status, dueDate } = createTodoDto;

        let finalDueDate = dueDate;
        if (!finalDueDate) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3); // Add 3 days
            finalDueDate = currentDate;
        }

        return this.todoRepository.save({
            title,
            description,
            status,
            dueDate: finalDueDate,  
            user
        });
    }
}
