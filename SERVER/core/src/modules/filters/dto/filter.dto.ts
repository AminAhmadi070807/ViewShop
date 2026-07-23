import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class FilterDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;
}

export class FilterOptionsDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نوع نمیتواند خالی باشد' })
  @IsString({ message: 'نوع باید رشته باشد' })
  type: string;

  @IsBoolean({ message: 'لطفا برای حالت عمومی را درست ست کنید' })
  public: boolean;
}
