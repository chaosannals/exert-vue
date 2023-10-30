import { Injectable } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SHA256, enc } from 'crypto-js';
import { User } from 'src/api/user/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) { }

    // 验证用户
    async validateUser(username: string, pass: string): Promise<any> {
        console.log('validateUser', username);
        const user = await this.usersService.findByUsername(username);
        const password = enc.Base64.stringify(SHA256(pass));
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    // 登录
    async login(user: User) {
        const payload = { username: user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
