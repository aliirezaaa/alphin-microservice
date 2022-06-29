import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter';
import { RpcValidationFilter } from './rpcvalidat.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { port: 7575 },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new RpcValidationFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen();
}
bootstrap();
