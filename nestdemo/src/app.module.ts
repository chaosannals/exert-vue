import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { AnimalModule } from './api/animal/animal.module';
import { AuthModule } from './auth/auth.module';
import { SiteModule } from './site/site.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './api/user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

class MySnakeNamingStrategy extends SnakeNamingStrategy {

}

const defaultOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'demo',
  logging: true, // 打印 SQL
  autoLoadEntities: true, // 配合模块的 forFeature 自动加载实体
  synchronize: true, // 此项会自动修改数据库结构，生产环境应该关掉，不然会丢失线上数据。
  namingStrategy: new MySnakeNamingStrategy(),
};

@Dependencies(DataSource)
@Module({
  imports: [
    HeroModule,
    AnimalModule,
    AuthModule,
    SiteModule,
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'demo'
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
