import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class PaymentDto {
  @IsUUID('4', { message: 'شناسه پرداخت نامعتبر است نامعتبر است' })
  payment: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNumber({}, { message: 'قیمت باید عداد باشد' })
  @IsPositive({ message: 'قیمت نامعتبر است' })
  amount: number;
}
