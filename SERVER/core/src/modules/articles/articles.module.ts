import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CategoriesModule } from '../categories/categories.module';
import { StoreModule } from '../store/store.module';
import { MediaModule } from '../media/media.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [
    TypeOrmModule.forFeature([Article]),
    CategoriesModule,
    StoreModule,
    MediaModule,
  ],
})
export class ArticlesModule {}
