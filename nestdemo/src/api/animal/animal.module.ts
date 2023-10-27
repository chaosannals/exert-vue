import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';
// import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Module({
  // imports: [
  //   AuthModule,
  // ],
  controllers: [AnimalController, CatController],
  providers: [
    AnimalService,
    CatService,

    //该模块 全局验证
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})
export class AnimalModule {}
