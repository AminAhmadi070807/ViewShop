import { PartialType } from '@nestjs/mapped-types';
import { CreateProductFilterDto } from './create-product-filter.dto';

export class UpdateProductFilterDto extends PartialType(CreateProductFilterDto) {
  id: number;
}
