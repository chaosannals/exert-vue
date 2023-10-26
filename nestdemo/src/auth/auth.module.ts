import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, UserService, LocalStrategy],
  exports: [UserService],
})
export class AuthModule {}
