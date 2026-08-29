import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentVerifyStatusEnum {
  OK = 'OK',
  NOK = 'NOK',
}

export class PaymentDto {
  @ApiProperty({ type: Number, required: true, example: 100000 })
  @IsNumber({}, { message: 'قیمت باید عداد باشد' })
  @IsPositive({ message: 'قیمت نامعتبر است' })
  amount: number;
}

export class VerifyPaymentDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
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
  @IsEnum(PaymentVerifyStatusEnum, { message: 'وضیعت پرداخت نامعتبر است' })
  Status: PaymentVerifyStatusEnum;
}
