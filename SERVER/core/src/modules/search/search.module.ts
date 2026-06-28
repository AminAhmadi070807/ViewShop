import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Search } from './entities/search.entity';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [TypeOrmModule.forFeature([Search])],
})
export class SearchModule {}
