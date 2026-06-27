import { OrderStatusEnum } from '../../../common/enums/order/order.status.enum';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CartItemDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class OrderDto {
  @IsNotEmpty()
  @IsUUID()
  address: string;

  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cart: CartItemDto[];

  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  price: number;
}
