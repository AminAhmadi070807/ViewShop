import { Module } from '@nestjs/common';
import { FilterTypeService } from './filter-type.service';
import { FilterTypeController } from './filter-type.controller';

@Module({
  controllers: [FilterTypeController],
  providers: [FilterTypeService],
})
export class FilterTypeModule {}
