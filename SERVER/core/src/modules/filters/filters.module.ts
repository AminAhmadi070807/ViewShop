import { Module } from '@nestjs/common';
import { FiltersService } from './filter/filters.service';
import { FiltersController } from './filter/filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';

@Module({
  controllers: [FiltersController],
  providers: [FiltersService],
  imports: [TypeOrmModule.forFeature([Filter])],
})
export class FiltersModule {}
