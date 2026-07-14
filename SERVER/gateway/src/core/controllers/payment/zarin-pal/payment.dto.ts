import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    type: Number,
    required: true,
    example: 100000,
  })
  @IsNotEmpty({ message: 'قیمت نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'قیمت باید عداد باشد' },
  )
  @IsInt({
    message: 'قیمت نامعتبر است',
  })
  amount: number;
}
