import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../../../common/enums/order/order.status.enum';

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

export class UpdateOrderDto {
  @IsNotEmpty({ message: 'ایدی سفارش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی سفارش نامعتبر هست' })
  id: string;

  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
