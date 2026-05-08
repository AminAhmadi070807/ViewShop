import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { CustomException } from './common/exceptions/custom.exception.error';

void (async (): Promise<void> => {
  try {
    // port
    const port: number = parseInt(process.env.PORT as string, 10) || 4000;
    // host
    const host: string = (process.env.HOST as string) || '127.0.0.1';

    const app: INestMicroservice =
      await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
          host,
          port,
        },
      });

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const messages = errors.map((error) =>
            Object.values(error.constraints || {}).join(', '),
          );

          return new CustomException(messages.join(' | '), 400);
        },
      }),
    );

    await app.listen();
    console.log(`Core Microservice (TCP) start on ${host}:${port}`);
  } catch {
    console.error('Problem in start core microservice');
  }
})();
