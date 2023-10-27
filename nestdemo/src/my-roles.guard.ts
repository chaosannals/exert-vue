import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class MyRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // 接口没有角色限定就直接放行。
        // 通过 @SetMetadata 设置，Reflector 获取。
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        // 有角色限定的话，进行判定，示例没有数据，所以直接放行。
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return true;
    }
}