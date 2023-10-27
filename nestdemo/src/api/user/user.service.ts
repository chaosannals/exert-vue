import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private dataSource: DataSource
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOneById(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createMany(users: User[]) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const user of users) {
                await queryRunner.manager.save(user);
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            //如果遇到错误，可以回滚事务
            await queryRunner.rollbackTransaction();
        } finally {
            //你需要手动实例化并部署一个queryRunner
            await queryRunner.release();
        }
    }
}
