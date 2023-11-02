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
import { redisStore } from 'cache-manager-redis-store';
import { caching } from 'cache-manager';
import { Ssh2Module } from './api/ssh2/ssh2.module';
// import { MulterModule } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServerResponse } from 'http';
import { Stats } from 'fs';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        // 越前面优先级越高。
        '.env', // 高
        '.dev.env',  // 低
      ],
    }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: join(__dirname, '../public'),
    //     filename: (_, filename, callback) => {
    //       return callback(null, filename);
    //     }
    //   }),
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
      serveStaticOptions: { // 默认单页面模式，有 index.html 就会把 404 重写。
        setHeaders(res: ServerResponse, path: string, stat: Stats) {
          if (path.endsWith('.css')) {
            // console.log(res, path, stat);
            // res.setHeader('Content-Type', 'text/css');
            // return {
            //   'Content-Type': 'text/css',
            // };
          }
        }
      }
    }),
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
    CacheModule.registerAsync({ // 使用 redis 必须是 cache-manager 4.x 版本，最新的 5.x 没有适配 nestjs .
      isGlobal: true,
      useFactory: async () => {
        return caching({
          store: await redisStore({
            socket: {
              host: 'localhost',
              port: 6379,
            },
            database: 0,
            store: 'none', // 
          }),
        });
      },
    }),
    Ssh2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
