import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormModuleConfig } from './common/config/typeorm.config';
import { ParentProductModule } from './modules/parent-product/parent-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeormModuleConfig),
    ParentProductModule,
  ],
})
export class AppModule {}
