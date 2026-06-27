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
  @IsNotEmpty({ message: 'شناسه ادرس نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه ادرس نامعتبر است' })
  address: string;
}

export class UpdateOrderDto {
  @ApiProperty({
    type: String,
    example: '',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'ایدی سفارش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی سفارش نامعتبر هست' })
  id: string;

  @ApiProperty({
    type: String,
    example: OrderStatusEnum.PENDING,
    nullable: false,
    required: true,
    enum: OrderStatusEnum,
  })
  @IsNotEmpty({ message: 'وضیعت سفارش نمیتواند خالی باشد' })
  @IsEnum(OrderStatusEnum, { message: 'لطفا وضیعت سفارش را درست انتخاب کنید' })
  status: OrderStatusEnum;
}
