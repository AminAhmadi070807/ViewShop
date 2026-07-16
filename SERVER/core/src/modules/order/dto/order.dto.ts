import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { OrderStatusEnum } from '../../../common/enums/order/order.status.enum';

export class OrderDto {
  @IsNotEmpty({ message: 'ایدی ادرس نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ادرس نامعتبر هست' })
  address: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاربر نامعتبر هست' })
  user: string;
}

export class UpdateOrderDto {
  @IsNotEmpty({ message: 'ایدی سفارش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی سفارش نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'وضیعت نمیتواند خالی باشد' })
  @IsEnum(OrderStatusEnum, { message: 'لطفا وضیعت را به درستی انتخاب نماید' })
  status: OrderStatusEnum;
}

export class PaymentOrderDto {
  @IsNotEmpty({ message: 'ایدی سفارش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی سفارش نامعتبر هست' })
  id: string;
}
