import { Controller, Request, Get, Post, UseGuards, SetMetadata, Next, Redirect, Query, Param, HttpCode, Header, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { MyRolesGuard, Roles } from './my-roles.guard';
import { Public } from './auth/jwt-auth.guard';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

/**
 *  路由 action 参数：
 *  @Request()，@Req()	req
    @Response()，@Res()*	res
    @Next()	next
    @Session()	req.session
    @Param(key?: string)	req.params/req.params[key]
    @Body(key?: string)	req.body/req.body[key]
    @Query(key?: string)	req.query/req.query[key]
    @Headers(name?: string)	req.headers/req.headers[name]
    @Ip()	req.ip
    @HostParam()	req.hosts
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get()
  @Header('Cache-Control', 'none')
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("env")
  @Public()
  getEnv(): any {
    return {
      v: process.env.CUSTOM_V,
      v2: process.env.CUSTOM_2,
    };
  }

  @Post()
  @HttpCode(204) // Not Content
  create() {
    return 'This action adds a new cat';
  }

  @Public()
  @UseGuards(LocalAuthGuard) // local 要和 local.strategy.ts 对应
  @Post('auth/login')
  async login(@Request() req) {
    console.log('post auth/login');
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(new MyRolesGuard()) 有 依赖注入 时构造实例需要特殊处理，最方便的是使用类名，让框架去注入。
  @UseGuards(MyRolesGuard)
  @Get('roles')
  @Roles('admin')
  getRoles(@Request() req) {
    return 'roles';
  }

  @Get('has_md')
  @SetMetadata('need_roles', ['admin'])
  getSome(@Request() req, @Next() next) {
    return 'some';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get(':id') // 路由定义有先后，此处如果设置这样，会导致之后的路由全部被 :id 截获。
  @Get('/aaacat/:id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get('cache')
  @Public()
  @CacheKey('custom_key') // 【可选】 缓存键
  @CacheTTL(20) //【可选】  过期时间 20s
  async getCache(): Promise<string> {
    const k = 'cache-string';
    const t = await this.cacheManager.get<number>(k) ?? 1;
    await this.cacheManager.set(k, t + 1);
    return `number: ${t}`;
  }
}
