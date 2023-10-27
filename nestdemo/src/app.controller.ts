import { Controller, Request, Get, Post, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { MyRolesGuard, Roles } from './my-roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
  getSome(@Request() req) {
    return 'some';
  }
}
