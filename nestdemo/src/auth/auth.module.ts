import { Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../api/user/user.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from 'src/api/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    UserModule,
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [UserService, AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    private userService: UserService,
  ) {}

  async onModuleInit() {
    await this.userService.ensureAdmin();
  }
}
