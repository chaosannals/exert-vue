import { Controller, Get, HostParam, HttpStatus, Post, Res } from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth.guard';
import { Response } from 'express'; // 缺点：依赖平台类型，与平台耦合了。不通过返回值直接输出响应。
// 缺点2：还失去了 nest 能力，需要加上配置 passthrough 后通过 nest 流程返回值来处理。

/**
 * 多级域名匹配，试了没效果。TODO 
 */
@Controller({
    // path: 'site',
    host: ':site.abcdefg.com',
})
export class SiteController {
    @Get()
    @Public()
    getInfo(@HostParam('site') account: string) {
        return account;
    }

    @Post()
    create(@Res() res: Response) {
        res.status(HttpStatus.CREATED).send();
    }

    @Get("all")
    findAll(@Res() res: Response) {
        res.status(HttpStatus.OK).json([]);
    }

    @Get("allin")
    findAll2(@Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.OK);
        return [];
    }
}
