import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpGlobalExceptionFilter } from './common/filters/global.filter';
import { JwtAccessTokenAuthGuard } from './common/guards/auth.access.guard';
import { JwtRefreshTokenGuard } from './common/guards/auth.refresh.guard';
import { MainGuard } from './common/guards/main.guard';
import { GuardsModule } from './guards/guards.module';
import { PaymentModule } from './payment/payment.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    GuardsModule,
    PaymentModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpGlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtRefreshTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: MainGuard,
    },
  ],
})
export class AppModule {}
