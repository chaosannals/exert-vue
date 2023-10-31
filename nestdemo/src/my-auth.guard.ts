import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

/**
 * 本示例 自定义一个 守卫
 * 因为 AuthGuard 已经由此框架提供了，为避免重名，使用 MyAuthGuard
 * AuthGuard 是一个泛函，是授权框架提供的一个助手函数。
 * 守卫是
 *  1.通过 @UseGuards 被使用的
 *  2.也可以通过 app.useGlobalGuards(new MyAuthGuard()); 注册全局
 *  3.通过模块配置提供者 providers: [
        {
        provide: APP_GUARD,
        useClass: MyAuthGuard,
        },
    ],

    @SetMetadata(key, value) 可以配合守卫注入特定的信息，再由守卫通过 Reflector 获取。
 */
@Injectable()
export class MyAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {

    }

    /**
     * 
     * @param context 
     * @returns 该函数返回 bool 用于指示是否允许当前请求，false 或 null 将忽略该请求。
     */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('MyAuthGuard.canActivate', isPublic);
        // return validateRequest(request);
        return true;
    }
}

