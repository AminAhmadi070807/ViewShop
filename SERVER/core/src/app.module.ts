import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from './common/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync(TypeOrmModuleConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
