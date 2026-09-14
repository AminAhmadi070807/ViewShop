import {
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';

export class CartDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'شناسه محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;

  @IsUUID('4', { message: 'شناسه محصول انتخابی نامعتبر است' })
  product_detail_id: string;

  @IsUUID('4', { message: 'شناسه رنگ نامعتبر هست' })
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
