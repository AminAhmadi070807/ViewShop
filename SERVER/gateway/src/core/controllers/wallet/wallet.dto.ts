import { IsInt, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 100000,
  })
  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'مقدار باید عدد باشد' },
  )
  @IsInt({ message: 'مقدار باید اینتیجر باشد' })
  amount: number;
}
