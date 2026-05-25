import { PartialType } from '@nestjs/mapped-types';
import { CreateParentProductDto } from './create-parent-product.dto';

export class UpdateParentProductDto extends PartialType(CreateParentProductDto) {
  id: number;
}
