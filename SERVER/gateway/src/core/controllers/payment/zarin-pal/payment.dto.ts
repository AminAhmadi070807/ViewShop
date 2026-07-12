import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentSectionEnum } from '../../../../common/enums/payment/payment.enum';

export class PaymentDto {
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

  @ApiProperty({
    type: String,
    required: true,
    enum: PaymentSectionEnum,
    example: PaymentSectionEnum.ORDER,
  })
  @IsNotEmpty({ message: 'سرویس نمیتواند خالی باشد' })
  @IsEnum(PaymentSectionEnum, { message: 'سرویس نامعتبر است' })
  service: PaymentSectionEnum;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه سرویس نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه سرویس نامعتبر است' })
  service_id: string;
}
