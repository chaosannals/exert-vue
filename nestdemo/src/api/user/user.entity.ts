import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, VersionColumn, Generated } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', nullable: true, })
  birthdate: string;

  @Column()
  @Generated("uuid")
  uuid: string;

  @CreateDateColumn()
  createAt: string;

  @UpdateDateColumn()
  updateAt: string;

  @VersionColumn()
  version: number;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}
