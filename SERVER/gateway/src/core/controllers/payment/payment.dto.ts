import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    example: 10000,
  })
  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'قیمت نامعتبر است' },
  )
  amount: number;

  @ApiProperty({
    type: String,
    required: true,
    example: 'درحال تست سرویس پرداخت',
    minLength: 8,
    maxLength: 54,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'توضیحات حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(54, { message: 'توضیحات حدکثر میتواند 54 کارکتر داشته باشد' })
  description: string;
}
