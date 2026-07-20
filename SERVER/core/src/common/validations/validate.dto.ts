import { IsUUID } from 'class-validator';

export class ValidateUUID {
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;

  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  user: string;

  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  role: string;
}
