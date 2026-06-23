import { IsInt, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 36,
    maxLength: 36,
    description: 'ایدی محصول درخاستی',
  })
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی محصول نامعتبر هست' })
  product: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'تعداد محصول نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'تعداد درخاستی باید اعداد باشد' },
  )
  @Min(1, { message: 'حدقل درخاستی 1 عدد هست' })
  @IsInt({ message: 'تعداد درخاستی باید بیشتر از 0 باشد' })
  quantity: number;
}
