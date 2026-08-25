import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { MediaModule } from '../media/media.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [StoryController],
  providers: [StoryService],
  imports: [
    TypeOrmModule.forFeature([Story]),
    MediaModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class StoryModule {}
