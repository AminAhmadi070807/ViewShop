import { PartialType } from '@nestjs/mapped-types';
import { CreateFilterTypeDto } from './create-filter-type.dto';

export class UpdateFilterTypeDto extends PartialType(CreateFilterTypeDto) {
  id: number;
}
