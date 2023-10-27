import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { AnimalModule } from './api/animal/animal.module';
import { AuthModule } from './auth/auth.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [HeroModule, AnimalModule, AuthModule, SiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
