import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class PaymentDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه پرداخت نامعتبر است' })
  payment: string;

  @ApiProperty({ type: Number, required: true, example: 100000 })
  @IsNumber({}, { message: 'قیمت باید عداد باشد' })
  @IsPositive({ message: 'قیمت نامعتبر است' })
  amount: number;
}
