import { CustomRepository } from "src/typeorm-ex.decorator";
import { Todo } from "./todo.entity";
import { Repository } from "typeorm";
import { SearchTodoDto } from "./search-todo.dto";

@CustomRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    
    async getTodos(searchDto: SearchTodoDto): Promise<Todo[]> {
        const {status, search} = searchDto;
        const query = this.createQueryBuilder('todo');
        if(status){
            query.andWhere('todo.status = :status', {status});
        }

        if(search){
            query.andWhere('todo.title LIKE :search OR todo.description LIKE :search', {search: `%${search}%`});
        }

        const todos = await query.getMany();
        return todos;
    }

}