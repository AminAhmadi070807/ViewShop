import { Module } from '@nestjs/common';
import { FilterTypeService } from './filter-type.service';
import { FilterTypeController } from './filter-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterType } from './entities/filter-type.entity';

@Module({
  controllers: [FilterTypeController],
  providers: [FilterTypeService],
  imports: [TypeOrmModule.forFeature([FilterType])],
  exports: [FilterTypeService],
})
export class FilterTypeModule {}
