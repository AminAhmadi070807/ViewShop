import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class FilterTypeDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsBoolean({ message: 'لطفا برای حالت عمومی را درست ست کنید' })
  public: boolean;
}
