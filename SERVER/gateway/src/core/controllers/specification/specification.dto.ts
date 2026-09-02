import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductFilterDetailsDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  value: string;
}

export class ProductFilterDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: () => ProductFilterDetailsDto,
    nullable: false,
    isArray: true,
    required: true,
    example: ProductFilterDetailsDto,
  })
  @ArrayNotEmpty({ message: 'دیتا های ارسالی نمیتواند خالی باشد' })
  @IsArray({ message: 'دیتا های ارسالی نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => ProductFilterDetailsDto)
  details: ProductFilterDetailsDto[];
}
