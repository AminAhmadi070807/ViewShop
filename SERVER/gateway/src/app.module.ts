import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpGlobalExceptionFilter } from './common/filters/global.filter';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpGlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
