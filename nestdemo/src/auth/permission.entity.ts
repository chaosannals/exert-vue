import { UserPermission } from "src/api/user/user.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => UserPermission, user => user.permission, {createForeignKeyConstraints: false})
    users: Promise<UserPermission[]>;
}