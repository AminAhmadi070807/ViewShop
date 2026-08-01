import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FilterTypeEnum } from '../../../common/enums/filters/filter.enum';
import { Type } from 'class-transformer';

class FilterTypeOptionsDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار نامعتبر است' })
  alias: string;
}

export class FilterTypeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: String,
    enum: FilterTypeEnum,
    required: true,
    nullable: false,
    example: FilterTypeEnum.SEARCH,
  })
  @IsEnum(FilterTypeEnum, { message: 'نوع نامعتبر است' })
  type: FilterTypeEnum;

  @ApiProperty({
    type: () => FilterTypeOptionsDto,
    required: true,
    nullable: false,
    example: FilterTypeOptionsDto,
  })
  @ArrayNotEmpty({ message: 'ارایه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => FilterTypeOptionsDto)
  @IsOptional({ message: 'ارایه دیتا ها اختیاری است' })
  details?: FilterTypeOptionsDto[];
}

export class UpdateFilterTypeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه فیلتر تایپ نمیتواند خالی باشد' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: String,
    enum: FilterTypeEnum,
    required: true,
    nullable: false,
    example: FilterTypeEnum.SEARCH,
  })
  @IsEnum(FilterTypeEnum, { message: 'نوع نامعتبر است' })
  type: FilterTypeEnum;

  @ApiProperty({
    type: () => FilterTypeOptionsDto,
    required: true,
    nullable: false,
    example: FilterTypeOptionsDto,
  })
  @ArrayNotEmpty({ message: 'ارایه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => FilterTypeOptionsDto)
  @IsOptional({ message: 'ارایه دیتا ها اختیاری است' })
  details?: FilterTypeOptionsDto[];
}
