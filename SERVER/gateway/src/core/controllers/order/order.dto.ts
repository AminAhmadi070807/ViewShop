import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({
    type: String,
    example: '',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'ایدی ادرس نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ادرس نامعتبر هست' })
  address: string;
}
