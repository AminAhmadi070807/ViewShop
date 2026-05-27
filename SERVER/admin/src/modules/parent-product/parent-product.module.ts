import { Module } from '@nestjs/common';
import { ParentProductService } from './parent-product.service';
import { ParentProductController } from './parent-product.controller';
import { CoreModule } from '../../core/core.module';

@Module({
  controllers: [ParentProductController],
  providers: [ParentProductService],
  imports: [CoreModule],
})
export class ParentProductModule {}
