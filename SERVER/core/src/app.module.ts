import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from './common/config/typeorm.config';

@Module({
  imports: [UsersModule, TypeOrmModule.forRootAsync(TypeOrmModuleConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
