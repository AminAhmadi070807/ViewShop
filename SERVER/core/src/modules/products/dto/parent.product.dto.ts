import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  ProductApprovalStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import {
  ProductReturnPolicyTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../common/enums/products/product/type.enum';
import { ProductVisibilityEnum } from '../../../common/enums/products/product/visibility.enum';

export class ParentProductDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید', each: true })
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

  // product type
  @IsNotEmpty()
  @IsEnum(ProductTypeEnum)
  product_type: ProductTypeEnum;

  // product tax amount
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  tax_percent: number;

  // product warranty type
  @IsNotEmpty()
  @IsEnum(ProductWarrantyTypeEnum)
  warranty_type: ProductWarrantyTypeEnum;

  // product return policy type
  @IsNotEmpty()
  @IsEnum(ProductReturnPolicyTypeEnum)
  return_policy_type: ProductReturnPolicyTypeEnum;

  // product visibility
  @IsNotEmpty()
  @IsEnum(ProductVisibilityEnum)
  visibility: ProductVisibilityEnum;

  // product minimum quantity
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minimum_quantity: number;

  // product maximum quantity
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maximum_quantity: number;

  // product minimum price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  min_price: number;

  // product maximum price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  max_price: number;
}

export class UpdateParentProductDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  id: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید', each: true })
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

  // product status
  @IsNotEmpty()
  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum;

  // product return policy type
  @IsNotEmpty()
  @IsEnum(ProductReturnPolicyTypeEnum)
  return_policy_type: ProductReturnPolicyTypeEnum;

  // product minimum price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  min_price: number;

  // product maximum price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  max_price: number;
}
