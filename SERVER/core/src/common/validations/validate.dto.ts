import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ValidateUUID {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNotEmpty({ message: 'نقش نمیتواند خالی باشد' })
  @IsString({ message: 'نقش باید رشته باشد' })
  title: string;
}
