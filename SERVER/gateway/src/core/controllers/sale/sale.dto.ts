import { IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  product: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  user: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه دیتای نامعتبر است' })
  product_detail_id: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNumber({}, { message: 'قیمت باید نامبر باشد' })
  price: number;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNumber({}, { message: 'قیمت محصول نامبر باشد' })
  product_price: number;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNumber({}, { message: 'تعداد باید نامبر باشد' })
  quantity: number;
}
