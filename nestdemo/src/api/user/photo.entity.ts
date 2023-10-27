import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ type: 'datetime', nullable: true, })
    createAt: string;

    @ManyToOne(type => User, user => user.photos)
    user: User;
}