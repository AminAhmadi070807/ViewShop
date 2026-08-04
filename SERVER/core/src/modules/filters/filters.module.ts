import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';

@Module({
  controllers: [FiltersController],
  providers: [FiltersService],
  imports: [TypeOrmModule.forFeature([Filter])],
  exports: [FiltersService],
})
export class FiltersModule {}
