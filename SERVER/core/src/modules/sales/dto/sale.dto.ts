import { IsNumber, IsUUID } from 'class-validator';

export class SaleDto {
  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  product: string;

  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  user: string;

  @IsUUID('4', { message: 'شناسه دیتای نامعتبر است' })
  product_detail_id: string;

  @IsNumber({}, { message: 'قیمت باید نامبر باشد' })
  price: number;

  @IsNumber({}, { message: 'قیمت محصول نامبر باشد' })
  product_price: number;

  @IsNumber({}, { message: 'تعداد باید نامبر باشد' })
  quantity: number;
}
