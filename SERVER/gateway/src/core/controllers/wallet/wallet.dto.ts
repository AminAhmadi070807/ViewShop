import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
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
