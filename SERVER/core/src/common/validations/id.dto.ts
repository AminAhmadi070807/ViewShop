import { IsNotEmpty, IsUUID } from 'class-validator';

export class ValidateUUID {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;
}
