import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  ProductApprovalStatusEnum,
  ProductIndexableStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
  ProductSupplyStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import {
  ProductOwnershipTypeEnum,
  ProductReturnPolicyTypeEnum,
  ProductTaxTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../common/enums/products/product/type.enum';
import { ProductVisibilityEnum } from '../../../common/enums/products/product/visibility.enum';

export class ParentProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(255)
  title: string;

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

  // product supply status
  @IsNotEmpty()
  @IsEnum(ProductSupplyStatusEnum)
  supply_status: ProductSupplyStatusEnum;

  // product indexable status
  @IsNotEmpty()
  @IsEnum(ProductIndexableStatusEnum)
  indexable_status: ProductIndexableStatusEnum;

  // product type
  @IsNotEmpty()
  @IsEnum(ProductTypeEnum)
  product_type: ProductTypeEnum;

  // product ownership type
  @IsNotEmpty()
  @IsEnum(ProductOwnershipTypeEnum)
  ownership_type: ProductOwnershipTypeEnum;

  // product tax type
  @IsNotEmpty()
  @IsEnum(ProductTaxTypeEnum)
  tax_type: ProductTaxTypeEnum;

  // product tax amount
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  tax_amount: number;

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

  // product reserved quantity
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  reserved_quantity: number;

  // product low stock threshold
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  low_stock_threshold: number;

  // product allow backorder
  @IsNotEmpty()
  @IsBoolean()
  allow_backorder: boolean;

  // product base price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  base_price: number;

  // product sale price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sale_price: number;

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

  // product final price
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  final_price: number;

  // product discount percent
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount_percent: number;

  // product discount amount
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount_amount: number;
}
