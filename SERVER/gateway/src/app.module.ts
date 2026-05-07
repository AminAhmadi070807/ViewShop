import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpGlobalExceptionFilter } from './common/filters/global.filter';
import { JwtAccessTokenAuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpGlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenAuthGuard,
    },
  ],
})
export class AppModule {}
