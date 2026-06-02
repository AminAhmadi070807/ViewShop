import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'node:path';

void (async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

    app.use(cookieParser());

    // set global api prefix
    app.setGlobalPrefix('api/v1');

    // read file from server
    app.useStaticAssets(path.join(__dirname, '../uploads'), {
      prefix: '/uploads',
    });

    // set core swagger config
    const swaggerConfig = new DocumentBuilder()
      .setTitle('ViewShop Api documentation')
      .setDescription('These paths are related to the core.')
      .setVersion('1.0.0')
      .build();

    // create core document
    const gatewayDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [AppModule],
      deepScanRoutes: true,
    });

    const coreDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [AppModule],
      deepScanRoutes: true,
    });
    // create guard document
    const guardDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [AppModule],
      deepScanRoutes: true,
    });
    // create payment document
    const paymentDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [AppModule],
      deepScanRoutes: true,
    });

    // remove all routes except core
    if (coreDocument.paths) {
      Object.keys(coreDocument.paths).forEach((path) => {
        if (!path.includes('/core')) delete coreDocument.paths[path];
      });
    }

    // remove all route except guards
    if (guardDocument.paths) {
      Object.keys(guardDocument.paths).forEach((path) => {
        if (!path.includes('/guards')) delete guardDocument.paths[path];
      });
    }

    // remove all route except guards
    if (paymentDocument.paths) {
      Object.keys(paymentDocument.paths).forEach((path) => {
        if (!path.includes('/payment')) delete paymentDocument.paths[path];
      });
    }

    // remove all route except guards
    if (gatewayDocument.paths) {
      Object.keys(gatewayDocument.paths).forEach((path) => {
        if (!path.includes('/gateway')) delete gatewayDocument.paths[path];
      });
    }

    // setup core document
    SwaggerModule.setup('api/v1/core/docs', app, coreDocument);
    // setup guard document
    SwaggerModule.setup('api/v1/guard/docs', app, guardDocument);
    // setup payment document
    SwaggerModule.setup('api/v1/payment/docs', app, paymentDocument);
    // setup gateway document
    SwaggerModule.setup('api/v1/gateway/docs', app, gatewayDocument);

    app.enableCors({
      origin: true,
      credentials: true,
    });

    // running server
    await app.listen(port, (): void => {
      console.log(`Server running on port: ${port}`);
    });
  } catch {
    console.error('Problem in running gateway');
    await app.close();
  }
})();
