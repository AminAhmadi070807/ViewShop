import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه محصول انتخابی نامعتبر است' })
  product_detail_id: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه رنگ نامعتبر هست' })
  color: string;

  @ApiProperty({ type: Number, required: true, nullable: false, example: 1 })
  @IsNotEmpty({ message: 'تعداد محصول نمیتواند خالی باشد' })
  @IsNumber({}, { message: 'تعداد درخاستی باید اعداد باشد' })
  @Min(1, { message: 'حدقل درخاستی 1 عدد هست' })
  quantity: number;
}
