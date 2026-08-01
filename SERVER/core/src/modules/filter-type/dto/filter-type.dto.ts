import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { FilterTypeEnum } from '../../../common/enums/filters/filter.enum';

export class FilterTypeDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsBoolean({ message: 'لطفا برای حالت عمومی را درست ست کنید' })
  public: boolean;
}

export class UpdateFilterTypeDto {
  @IsUUID('4', { message: 'شناسه فیلتر تایپ نمیتواند خالی باشد' })
  id: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsEnum(FilterTypeEnum, { message: 'نوع فیلتر تایپ نامعتبر است' })
  type: FilterTypeEnum;

  @IsBoolean({ message: 'لطفا برای حالت عمومی را درست ست کنید' })
  public: boolean;
}
