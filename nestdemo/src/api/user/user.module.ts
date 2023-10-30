import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { Photo } from './photo.entity';
import { Token } from './token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Photo]),
    TypeOrmModule.forFeature([Token], 'sqlite-1'),
  ],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
})
export class UserModule {}
