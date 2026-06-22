import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CategoriesModule } from '../categories/categories.module';
import { StoreService } from '../store/store.service';
import { MediaService } from '../media/media.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [
    TypeOrmModule.forFeature([Article]),
    CategoriesModule,
    StoreService,
    MediaService,
  ],
})
export class ArticlesModule {}
