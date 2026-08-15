import { IsNumber, IsUUID } from 'class-validator';

export class SaleDto {
  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  product: string;

  @IsUUID('4', { message: 'شناسه فروشگاه نامعتبر است' })
  store: string;

  @IsUUID('4', { message: 'شناسه دیتای نامعتبر است' })
  product_detail_id: string;

  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'قیمت باید نامبر باشد' },
  )
  price: number;

  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'تعداد باید نامبر باشد' },
  )
  quantity: number;
}
