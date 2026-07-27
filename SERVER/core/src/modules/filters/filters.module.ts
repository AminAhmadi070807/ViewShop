import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';
import { FilterTypeModule } from '../filter-type/filter-type.module';

@Module({
  controllers: [FiltersController],
  providers: [FiltersService],
  imports: [TypeOrmModule.forFeature([Filter]), FilterTypeModule],
  exports: [FiltersService],
})
export class FiltersModule {}
