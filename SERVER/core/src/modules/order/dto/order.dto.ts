import { IsNotEmpty, IsUUID } from 'class-validator';

export class OrderDto {
  @IsNotEmpty({ message: 'ایدی ادرس نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ادرس نامعتبر هست' })
  address: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاربر نامعتبر هست' })
  user: string;
}
