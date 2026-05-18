import { IsInt, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'مقدار باید عدد باشد' },
  )
  @IsInt({ message: 'مقدار باید بالای 0 باشد' })
  amount: number;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;
}
