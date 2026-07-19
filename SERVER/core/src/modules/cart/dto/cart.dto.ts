import {
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';

export class CartDto {
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاربر نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی محصول نامعتبر هست' })
  product: string;

  @IsHexColor({ message: 'رنگ نامعتبر است' })
  color: string;

  @IsNotEmpty({ message: 'تعداد محصول نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'تعداد درخاستی باید اعداد باشد' },
  )
  @Min(1, { message: 'حدقل درخاستی 1 عدد هست' })
  @IsInt({ message: 'تعداد درخاستی باید بیشتر از 0 باشد' })
  quantity: number;
}
