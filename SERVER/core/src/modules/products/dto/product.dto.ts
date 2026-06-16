import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';

export class ProductDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  userId: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  store: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  parentProductId: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  medias: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(255)
  @MaxLength(5000)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(255)
  @Matches(/^[a-zA-Z0-9-_]{9,255}$/, {
    message: 'لطفا برای نام مستعار از کلمات انگلیسی استفاده کنید',
  })
  alias: string;

  // product stock quantity
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock_quantity: number;

  // product price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  // product discount amount
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount_amount: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  id: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  medias: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(255)
  @MaxLength(5000)
  description: string;

  // product discount amount
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount_amount: number;
}

export class UpdateStatusProductDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductStatusEnum, {
    message:
      'وضیعت محصول فقط میتواند یکی از این موارد باشد (PENDING_APPROVAL, DELETED, DRAFT, INACTIVE, ACTIVE)',
  })
  status: ProductStatusEnum;
}
