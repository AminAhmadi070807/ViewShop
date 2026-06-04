import { IsEnum, IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { PaymentModelEnum } from '../../../common/enums/payment/payment.enum';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    enum: PaymentModelEnum,
    default: PaymentModelEnum.ZARIN_PAL,
  })
  @IsNotEmpty({ message: 'نوع سرویس پرداخت نمیتواند خالی باشد' })
  @IsEnum(PaymentModelEnum, { message: 'نوع سرویس پرداخت نادرست است' })
  IPG: PaymentModelEnum;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    default: 0,
  })
  @IsNotEmpty({ message: 'مقدار نمیتوناد خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'مقدار باید اعداد باشد' },
  )
  @IsInt({ message: 'مقدار باید بزرگتر از 500000' })
  @Min(500_000, { message: 'مقدار حدقل باید 50000 هزار تومان باشد' })
  @Max(1_000_000_000, {
    message: 'مقدار حدکثر میتواند 100000000 هزار تومان باشد',
  })
  amount: number;
}
