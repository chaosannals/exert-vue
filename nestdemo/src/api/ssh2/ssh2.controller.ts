import { Body, Controller, Get, Post } from '@nestjs/common';
import { Ssh2ExecOneResult, Ssh2Service } from './ssh2.service';
import { Ssh2DoSomeDto } from './ssh2.dto';
import { Public } from 'src/auth/jwt-auth.guard';
import { isEmpty } from 'lodash';

@Controller('ssh2')
export class Ssh2Controller {
    constructor(
        private ssh2Service: Ssh2Service,
    ) { }

    @Post("dosome")
    @Public()
    async doSome(@Body() doDto: Ssh2DoSomeDto) {
        if (isEmpty(doDto.commands)) {
            const result = await this.ssh2Service.execOne(doDto, doDto.command);
            return result;
        } else {
            const shell = await this.ssh2Service.openShell(doDto);
            for (const c of doDto.commands) {
                await shell.call(c);
            }
            await shell.end();
            await shell.result;
            console.log('==============================shell=======================', shell.stdout);
            
            return {
                stdout: shell.stdout,
                stderr: shell.stderr,
            };
        }
    }
}
