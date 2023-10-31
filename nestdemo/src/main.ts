import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { join } from 'path';
import { MyAuthGuard } from './my-auth.guard';

async function bootstrap() {
  // 这种写法单纯 微服务
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule, {
  //     transport: Transport.GRPC,
  //     options: {
  //       url: '0.0.0.0:30000',
  //       package: 'hero',
  //       protoPath: join(__dirname, 'hero/hero.proto'),
  //     },
  //   },
  // );
  // await app.listen();

  // 复合写法，可以 多微服务 和 接口
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  const myauth = app.get(MyAuthGuard);
  app.useGlobalGuards(myauth);

  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
