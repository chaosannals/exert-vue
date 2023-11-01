import { Module } from '@nestjs/common';
import { Ssh2Controller } from './ssh2.controller';
import { Ssh2Service } from './ssh2.service';

@Module({
  controllers: [Ssh2Controller],
  providers: [Ssh2Service]
})
export class Ssh2Module {}
