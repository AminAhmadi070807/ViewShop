import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatusEnum } from '../../../common/enums/order/order.status.enum';

export class OrderDto {
  @IsUUID('4', { message: 'شناسه ادرس نامعتبر است' })
  address: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;
}

export class UpdateOrderDto {
  @IsUUID('4', { message: 'شناسه سفارش نامعتبر است' })
  id: string;

  @IsEnum(OrderStatusEnum, { message: 'وضیعت سفارش نامعتبر است' })
  status: OrderStatusEnum;
}
