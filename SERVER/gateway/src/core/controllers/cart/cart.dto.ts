import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه رنگ نامعتبر هست' })
  color: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'تعداد محصول نمیتواند خالی باشد' })
  @IsNumber({}, { message: 'تعداد درخاستی باید اعداد باشد' })
  @Min(1, { message: 'حدقل درخاستی 1 عدد هست' })
  quantity: number;
}
