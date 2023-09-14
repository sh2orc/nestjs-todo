import { Module, ValidationPipe } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'testuser',
      password: 'testpwd',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Todo, User],
    }),
    AuthModule,    
  ],
  controllers: [],
  providers: [ {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class AppModule {}
