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
import { snakeCase } from 'lodash';
import { CacheModule } from '@nestjs/cache-manager';

class MySnakeNamingStrategy extends SnakeNamingStrategy {
  private prefix: string;

  constructor(prefix: string) {
    super();
    this.prefix = prefix;
  }

  tableName(className: string, customName: string): string {
    // console.log('tableName', className, customName);
    return this.prefix + snakeCase(customName ?? className);
    // return super.tableName(className, customName);
  }
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
  namingStrategy: new MySnakeNamingStrategy("nd_"),
};

@Dependencies(DataSource)
@Module({
  imports: [
    HeroModule,
    AnimalModule,
    AuthModule,
    SiteModule,
    // Mysql
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'demo',
      // name: "mysql-1", // 默认的不要命名，不然会导致获取不到报错。（多数据库）
    }),
    // Sqlite
    TypeOrmModule.forRoot({
      name: 'sqlite-1', // 命名，关联 注册 实体 时用作关联。（多数据库）
      type: 'sqlite',
      database: 'demo.db',
      autoLoadEntities: true,  // 配合模块的 forFeature 自动加载实体
      synchronize: true, // 此项会自动修改数据库结构，生产环境应该关掉，不然会丢失线上数据。
      namingStrategy: new MySnakeNamingStrategy("nd_"),
    }),
    UserModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
