import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';
import { UserService } from './user.service';
import { Public } from 'src/auth/jwt-auth.guard';
import { random, shuffle } from 'lodash';
import { Photo } from './photo.entity';
import { format } from 'date-fns';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Public()
    @Post("find")
    async find(
        @Param("skip") skip: number = 0,
        @Param("take") take: number = 100
    ): Promise<User[]> {
        return await this.userService.findAll(skip, take);
    }

    @Public()
    @Get("add_random")
    async addRandom(@Query("count") count: number = 10) {
        const users = [];
        for (let i = 0; i < count; ++i) {
            const user = new User();
            user.firstName = faker.person.firstName();
            user.lastName = faker.person.lastName();
            user.birthdate = format(faker.date.anytime(), 'yyyy-MM-dd HH:ii:ss');
            users.push(user);
        }
        await this.userService.createMany(users);
        return `Ok ${count}`;
    }

    @Public()
    @Get("add_photos")
    async addPhotos(@Query("count") count: number = 100, @Query("user_count") userCount: number = 10) {
        const userAllIds = await this.userService.getAllIds();
        const userIds = shuffle(userAllIds).slice(0, Math.min(userCount, userAllIds.length));
        const users = await this.userService.findByIds(userIds);
        const userMap = new Map(users.map(i => [i.id, i]));
        const photos = [];
        for (let i = 0; i < count; ++i) {
            const photo = new Photo();
            const userId = userIds[random(0, userIds.length - 1, false)];
            photo.user = Promise.resolve(userMap.get(userId));
            photo.url = faker.internet.url();
            photos.push(photo);
        }
        await this.userService.addPhotos(photos);
        return `Ok: ${count} => ${photos.length} => ${userIds} => ${users.map(i => i.id)}`;
    }
}
