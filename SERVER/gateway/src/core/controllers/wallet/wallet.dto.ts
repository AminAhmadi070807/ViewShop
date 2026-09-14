import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty({ type: Number, required: true, nullable: false, example: 0 })
  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsNumber({}, { message: 'مقدار باید عدد باشد' })
  @IsInt({ message: 'مقدار باید اینتیجر باشد' })
  amount: number;
}
