import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { Photo } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
})
export class UserModule {}
