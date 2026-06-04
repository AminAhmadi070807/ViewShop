import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  PaymentModelEnum,
  PaymentStatusEnum,
} from '../../../common/enums/payment/payment.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ValidationDto {
  @ApiProperty({
    nullable: false,
    required: true,
    description: 'the title payment service',
    enum: PaymentModelEnum,
    default: PaymentModelEnum.ZARIN_PAL,
  })
  @IsNotEmpty({ message: 'سرویس پرداخت نمیتواند خالی باشد' })
  @IsString({ message: 'سرویس پرداخت باید رشته باشد' })
  @IsEnum(PaymentModelEnum, { message: 'سرویس پرداخت نام معتبر است' })
  IPG: PaymentModelEnum;

  @ApiProperty({
    nullable: false,
    required: true,
    description: 'status message',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.WAITING,
  })
  @IsNotEmpty({ message: 'وضیعت نمیتواند خالی باشد' })
  @IsString({ message: 'وضیعت باید رشته باشد' })
  @IsEnum(PaymentStatusEnum, { message: 'وضیعت نامعتبر است' })
  status: PaymentStatusEnum;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'the status code return from payment service',
  })
  @IsNotEmpty({ message: 'کد وضیعت نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'کد وضیعت باید اعداد باشد' },
  )
  statusCode: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'description about the status code',
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدقل باید 5 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 50 کارکتر داشته باشد' })
  description: string;
}

export class FindValidationDto {
  @ApiProperty({
    nullable: false,
    required: true,
    description: 'the title payment service',
    enum: PaymentModelEnum,
    default: PaymentModelEnum.ZARIN_PAL,
  })
  @IsNotEmpty({ message: 'سرویس پرداخت نمیتواند خالی باشد' })
  @IsString({ message: 'سرویس پرداخت باید رشته باشد' })
  @IsEnum(PaymentModelEnum, { message: 'سرویس پرداخت نام معتبر است' })
  IPG: PaymentModelEnum;
}
