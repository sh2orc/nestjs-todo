import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from "./todo-status.enum";
import { User } from "src/auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TodoStatus;

    @Column('date', {
        default: () => `CURRENT_DATE + INTERVAL '7 days'`, // 현재 날짜에서 7일 뒤로 설정
    })
    dueDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne((_type) => User, (user) => user.todos, { eager: false })
    @Exclude({ toPlainOnly: true})
    user: User;
}
