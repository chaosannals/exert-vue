import { Controller, Get, Query } from '@nestjs/common';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';
import { UserService } from './user.service';
import { Public } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Public()
    @Get("add_random")
    async addRandom(@Query("count") count: number=10) {
        const users = [];
        for (let i = 0; i < count; ++i) {
            const user = new User();
            user.firstName = faker.person.firstName();
            user.lastName = faker.person.lastName();
            users.push(user);
        }
        await this.userService.createMany(users);
        return `Ok ${count}`;
    }
}
