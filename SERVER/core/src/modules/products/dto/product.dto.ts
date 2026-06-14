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
import {
  ProductApprovalStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
} from '../../../common/enums/products/product/status.enum';

export class ProductDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  userId: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  parentProductId: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  medias: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(255)
  @MaxLength(5000)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(255)
  @Matches(/^[a-zA-Z0-9].{9,255}$/)
  alias: string;

  // product status
  @IsNotEmpty()
  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum;

  // product stock status
  @IsNotEmpty()
  @IsEnum(ProductStockStatusEnum)
  stock_status: ProductStockStatusEnum;

  // product stock quantity
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock_quantity: number;

  // product approval status
  @IsNotEmpty()
  @IsEnum(ProductApprovalStatusEnum)
  approval_status: ProductApprovalStatusEnum;

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

  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  userId: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  parentProductId: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  media: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(255)
  @MaxLength(5000)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(255)
  @Matches(/^[a-zA-Z0-9].{9,255}$/)
  alias: string;

  // product approval status
  @IsNotEmpty()
  @IsEnum(ProductApprovalStatusEnum)
  approval_status: ProductApprovalStatusEnum;

  // product discount amount
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount_amount: number;
}
