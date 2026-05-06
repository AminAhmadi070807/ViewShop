import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from './common/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync(TypeOrmModuleConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
