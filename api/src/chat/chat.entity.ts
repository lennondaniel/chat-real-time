import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'room_id'})
    roomId: number;

    @Column({name: 'user_name'})
    userName: string;

    @Column()
    message: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}