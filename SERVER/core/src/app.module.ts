import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from './common/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './common/interceptors/global.interceptor';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync(TypeOrmModuleConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
  ],
})
export class AppModule {}
