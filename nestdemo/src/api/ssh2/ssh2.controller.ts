import { Body, Controller, Get, Post } from '@nestjs/common';
import { Ssh2Service } from './ssh2.service';
import { Ssh2DoSomeDto } from './ssh2.dto';
import { Public } from 'src/auth/jwt-auth.guard';

@Controller('ssh2')
export class Ssh2Controller {
    constructor(
        private ssh2Service: Ssh2Service,
    ) {}

    @Post("dosome")
    @Public()
    async doSome(@Body() doDto: Ssh2DoSomeDto) {
        const client = await this.ssh2Service.connect(doDto);
        const result = await this.ssh2Service.execOne(client, doDto.command);
        client.end();
        return result;
    }
}
