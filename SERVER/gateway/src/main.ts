import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

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

    // set core swagger config
    const coreConfig = new DocumentBuilder()
      .setTitle('ViewShop Api documentation')
      .setDescription('These paths are related to the core.')
      .setVersion('1.0.0')
      .build();

    // create core document
    const coreDocument = SwaggerModule.createDocument(app, coreConfig, {
      include: [AppModule],
      deepScanRoutes: true,
    });

    // setup core document
    SwaggerModule.setup('api/v1/core/docs', app, coreDocument);

    // running server
    await app.listen(port, (): void => {
      console.log(`Server running on port: ${port}`);
    });
  } catch {
    console.error('Problem in running gateway');
    await app.close();
  }
})();
