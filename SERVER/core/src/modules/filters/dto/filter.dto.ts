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
import { ValidateTitle } from '../../../common/validations/title.dto';
import { Type } from 'class-transformer';

export class FilterDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر نامعتبر است' })
  type: FilterTypeEnum;

  @ArrayNotEmpty({ message: 'ارایه دیتاها نمیتواند خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => ValidateTitle)
  @IsOptional({ message: 'ارایه دیتاها اختیاری است' })
  details?: ValidateTitle;
}

export class UpdateFilterDto {
  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است' })
  id: string;

  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر نامعتبر است' })
  type: FilterTypeEnum;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ArrayNotEmpty({ message: 'ارایه اطلاعات دیتاها نمیتواند خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => ValidateTitle)
  details: ValidateTitle;
}
