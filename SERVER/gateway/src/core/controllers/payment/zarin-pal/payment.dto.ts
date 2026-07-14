import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum status {
  OK = 'OK',
  NOK = 'NOK',
}

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

export class VerifyPaymentDto {
  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsString({ message: 'اتوراریتی باید رشته باشد' })
  authority: string;

  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsEnum(status, { message: 'لطفا وضیعت را بهدرستی وارد نماید' })
  status: string;
}
