import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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

  @IsBoolean({ message: 'لطفا برای حالت عمومی را درست ست کنید' })
  public: boolean;
}
