import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductFilterDetailsDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  value: string;
}

export class ProductFilterDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ArrayNotEmpty({ message: 'دیتا های ارسالی نمیتواند خالی باشد' })
  @IsArray({ message: 'دیتا های ارسالی نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => ProductFilterDetailsDto)
  details: ProductFilterDetailsDto[];
}
