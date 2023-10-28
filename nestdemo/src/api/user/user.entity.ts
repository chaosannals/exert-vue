import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true})
  isActive: boolean;

  @Column({type: 'date', nullable: true,})
  createAt: string;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}