import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TodoRepository]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
