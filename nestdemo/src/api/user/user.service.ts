import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';
import { SHA256, enc } from 'crypto-js';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private dataSource: DataSource
    ) { }

    findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({
            where: {
                username: username,
            }
        });
    }

    findAll(skip?: number, take?: number): Promise<User[]> {
        return this.usersRepository.find({
            skip: skip,
            take: take,
        });
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOneById(id);
    }

    findByIds(ids: number[]): Promise<User[]> {
        return this.usersRepository.find({
            where: {
                id: In(ids),
            }
        })
    }

    getAllIds(): Promise<number[]> {
        return this.usersRepository
            .find()
            .then(users => users.map(u => u.id));
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async ensureAdmin() {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const admin = await this.usersRepository.findOne({
                where: { username: 'admin' },
            });
            if (!admin) {
                const newAdmin = new User();
                newAdmin.username = 'admin';
                newAdmin.password = enc.Base64.stringify(SHA256("123456"));
                await queryRunner.manager.save(newAdmin);
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

    async addPhotos(photos: Photo[]) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const photo of photos) {
                await queryRunner.manager.save(photo);
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
