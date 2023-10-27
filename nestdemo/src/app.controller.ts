import { Controller, Request, Get, Post, UseGuards, SetMetadata, Next, Redirect, Query, Param, HttpCode, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { MyRolesGuard, Roles } from './my-roles.guard';
import { Public } from './auth/jwt-auth.guard';

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
    private readonly authService: AuthService
  ) { }

  @Get()
  @Header('Cache-Control', 'none')
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(204) // Not Content
  create() {
    return 'This action adds a new cat';
  }

  @UseGuards(LocalAuthGuard) // local 要和 local.strategy.ts 对应
  @Post('auth/login')
  async login(@Request() req) {
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

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
