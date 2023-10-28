import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @CreateDateColumn()
    createAt: string;

    @ManyToOne(type => User, user => user.photos, {createForeignKeyConstraints: false})
    user: Promise<User>;
}