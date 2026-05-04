import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';

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
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();
    console.log(`Core Microservice (TCP) start on ${host}:${port}`);
  } catch {
    console.error('Problem in start core microservice');
  }
})();
