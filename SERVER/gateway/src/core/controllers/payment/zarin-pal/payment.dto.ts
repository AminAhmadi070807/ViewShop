import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentVerifyStatusEnum {
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
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsString({ message: 'اتوراریتی باید رشته باشد' })
  Authority: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    enum: PaymentVerifyStatusEnum,
    example: PaymentVerifyStatusEnum.OK,
  })
  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsEnum(PaymentVerifyStatusEnum, {
    message: 'لطفا وضیعت را بهدرستی وارد نماید',
  })
  Status: PaymentVerifyStatusEnum;
}
