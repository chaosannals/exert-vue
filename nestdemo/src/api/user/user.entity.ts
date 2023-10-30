import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, VersionColumn, Generated } from 'typeorm';
import { Photo } from './photo.entity';
import { Record } from './record.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', nullable: true, })
  birthdate: string;

  // 嵌入实体
  // {prefix: false} 不然会把 record 加入在字段名前面。
  @Column(type => Record, {prefix: false})
  record: Record;

  @OneToMany((type) => Photo, (photo) => photo.user, {createForeignKeyConstraints: false})
  photos: Promise<Photo[]>; // Promise 时，关联数据时惰性 Lazy 的。
}
