import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CartDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;

  @IsUUID('4', { message: 'شناسه محصول انتخابی نامعتبر است' })
  product_detail_id: string;

  @IsUUID('4', { message: 'شناسه رنگ نامعتبر هست' })
  color: string;

  @IsNotEmpty({ message: 'تعداد محصول نمیتواند خالی باشد' })
  @IsNumber({}, { message: 'تعداد درخاستی باید اعداد باشد' })
  @Min(1, { message: 'حدقل درخاستی 1 عدد هست' })
  quantity: number;
}
