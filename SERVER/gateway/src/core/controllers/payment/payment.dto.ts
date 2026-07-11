import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The number of payments',
    example: 10000,
  })
  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'مقدار باید عداد باشد' },
  )
  @IsInt({
    message: 'مقدار باید بالای 1000 تومان باشد',
  })
  @Min(1000, { message: 'حدقل مقدار 1000 تومان هستش' })
  amount: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The number of payments',
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
