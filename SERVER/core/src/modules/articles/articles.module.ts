import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [TypeOrmModule.forFeature([Article])],
})
export class ArticlesModule {}
