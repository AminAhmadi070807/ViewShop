import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Details {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'توضیحات نامعتبر است نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات نامعتبر است' })
  value: string;
}

class ProductFilterDetailsDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: () => Details,
    nullable: false,
    isArray: true,
    required: true,
    example: Details,
  })
  @ArrayNotEmpty({ message: 'دیتا های ارسالی نمیتواند خالی باشد' })
  @IsArray({ message: 'دیتا های ارسالی نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => Details)
  details: Details[];
}

export class SpecificationDto {
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

export class UpdateSpecificationDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

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
