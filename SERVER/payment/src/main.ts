import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomException } from './common/exceptions/custom.exception.error';

void (async () => {
  try {
    const port: number = parseInt(process.env.PORT as string) ?? 4002;
    const host: string = process.env.HOST as string;

    const app: INestMicroservice =
      await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
          host: host,
          port: port,
        },
      });

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          const messages: string[] = errors.map((error) =>
            Object.values(error.constraints || {}).join(', '),
          );

          return new CustomException(messages.join(' | '), 400);
        },
      }),
    );

    await app.listen();
    console.log(`PAYMENT Microservice (TCP) start on ${host}:${port}`);
  } catch {
    console.log('Problem in running payment microservice');
  }
})();
