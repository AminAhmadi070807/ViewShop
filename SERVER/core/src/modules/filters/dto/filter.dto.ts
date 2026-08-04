import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { FilterTypeEnum } from '../../../common/enums/filters/filter.enum';

export class FilterDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر نامعتبر است' })
  type: FilterTypeEnum;

  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است' })
  typeId: string;
}

export class UpdateFilterDto {
  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است' })
  id: string;

  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر نامعتبر است' })
  type: FilterTypeEnum;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است' })
  typeId: string;
}
