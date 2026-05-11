import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpGlobalExceptionFilter } from './common/filters/global.filter';
import { JwtAccessTokenAuthGuard } from './common/guards/auth.access.guard';
import { JwtRefreshTokenGuard } from './common/guards/auth.refresh.guard';
import { RoleGuard } from './common/guards/role.guard';
import { GuardsModule } from './guards/guards.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule, GuardsModule],
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
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
