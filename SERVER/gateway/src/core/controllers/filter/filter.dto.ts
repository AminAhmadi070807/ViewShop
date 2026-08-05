import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FilterTypeEnum } from '../../../common/enums/filters/filter.enum';
import { ValidateTitle } from '../../../common/validation/title.dto';
import { Type } from 'class-transformer';

export class FilterDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    enum: FilterTypeEnum,
    nullable: false,
    required: true,
    example: FilterTypeEnum.SEARCH,
  })
  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر نامعتبر است' })
  type: FilterTypeEnum;

  @ApiProperty({
    type: () => ValidateTitle,
    nullable: true,
    isArray: true,
    required: true,
    example: ValidateTitle,
  })
  @ArrayNotEmpty({ message: 'ارایه دیتاها نمیتواند خالی باشد' })
  @IsArray({ message: 'ارایه دیتاها نمیتواند خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => ValidateTitle)
  @IsOptional({ message: 'ارایه دیتاها اختیاری است' })
  details?: ValidateTitle[];
}

export class UpdateFilterDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است' })
  id: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    enum: FilterTypeEnum,
    nullable: false,
    required: true,
    example: FilterTypeEnum.SEARCH,
  })
  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر نامعتبر است' })
  type: FilterTypeEnum;

  @ApiProperty({
    type: () => ValidateTitle,
    nullable: true,
    required: true,
    example: ValidateTitle,
  })
  @ArrayNotEmpty({ message: 'ارایه دیتاها نمیتواند خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => ValidateTitle)
  @IsOptional({ message: 'ارایه دیتاها اختیاری است' })
  details?: ValidateTitle;
}
