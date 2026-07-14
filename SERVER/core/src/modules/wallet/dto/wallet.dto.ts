import { IsInt, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class WalletDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'مقدار باید عدد باشد' },
  )
  @IsInt({ message: 'مقدار باید اینتیجر باشد' })
  amount: number;
}
