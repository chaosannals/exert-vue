import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { AnimalModule } from './api/animal/animal.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HeroModule, AnimalModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
