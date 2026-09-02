import { Module } from '@nestjs/common';
import { ProductFiltersService } from './specification.service';
import { ProductFiltersController } from './specification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFilter } from './entities/specification.entity';

@Module({
  controllers: [ProductFiltersController],
  providers: [ProductFiltersService],
  imports: [TypeOrmModule.forFeature([ProductFilter])],
})
export class SpecificationModule {}
