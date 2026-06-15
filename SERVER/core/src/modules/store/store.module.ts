import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { MediaModule } from '../media/media.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([Store]), MediaModule, CategoriesModule],
})
export class StoreModule {}
