import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

void (async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule);

  try {
    // port
    const port: number = parseInt(process.env.GATEWAY_PORT as string) || 3000;

    // set global validator
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    // set global api prefix
    app.setGlobalPrefix('api/v1');

    // running server
    await app.listen(port, (): void => {
      console.log(`Server running on port: ${port}`);
    });
  } catch {
    console.error('Problem in running gateway');
    await app.close();
  }
})();
