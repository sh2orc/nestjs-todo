import { Exclude } from "class-transformer";
import { Todo } from "src/todo/todo.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany((entityType) => Todo, (todo) => todo.user, { eager: false })
    todos: Todo[];
}