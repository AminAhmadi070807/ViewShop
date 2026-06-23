import { IsInt, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  quantity: number;
}
