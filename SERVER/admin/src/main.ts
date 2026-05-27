import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomException } from './common/exceptions/custom.exception.error';

void (async () => {
  const port: number = parseInt(process.env.PORT as string) || 4004;
  const host: string = process.env.HOST as string;

  // server
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: host,
        port: port,
      },
    },
  );

  // validation data
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const message: string[] = errors.map(
          (error: ValidationError): string => {
            return Object.values(error.constraints || {}).join(', ');
          },
        );

        return new CustomException(message.join(' | '), 400);
      },
    }),
  );

  // listen server
  await app.listen();
  console.log(`ADMIN Microservice (TCP) start on ${host}:${port}`);
})();
