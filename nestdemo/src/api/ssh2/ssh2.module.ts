import { Module } from '@nestjs/common';
import { Ssh2Controller } from './ssh2.controller';
import { Ssh2Service } from './ssh2.service';
import { Ssh2Gateway } from './ssh2.gateway';

@Module({
  controllers: [Ssh2Controller],
  providers: [Ssh2Service, Ssh2Gateway]
})
export class Ssh2Module {}
