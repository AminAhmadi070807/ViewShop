import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentVerifyStatusEnum {
  OK = 'OK',
  NOK = 'NOK',
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
