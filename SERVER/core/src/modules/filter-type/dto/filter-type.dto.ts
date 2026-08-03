import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
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
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر تایپ نامعتبر است' })
  type: FilterTypeEnum;

  @ArrayNotEmpty({ message: 'ارایه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => FilterTypeOptionsDto)
  @IsOptional({ message: 'ارایه دیتا ها اختیاری است' })
  details?: FilterTypeOptionsDto[];
}

export class UpdateFilterTypeDto {
  @IsUUID('4', { message: 'شناسه فیلتر تایپ نمیتواند خالی باشد' })
  id: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر تایپ نامعتبر است' })
  type: FilterTypeEnum;

  @ArrayNotEmpty({ message: 'ارایه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => FilterTypeOptionsDto)
  @IsOptional({ message: 'ارایه دیتا ها اختیاری است' })
  details?: FilterTypeOptionsDto[];
}
