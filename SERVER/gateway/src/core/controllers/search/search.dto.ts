import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  ProductReturnPolicyTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../common/enums/products/type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFilterDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    nullable: true,
    minLength: 3,
    maxLength: 255,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(9, { message: 'حدقل کارکتر عنوان باید 9 رشته باشد' })
  @MaxLength(255, { message: 'حدکثر کارتر عنوان میتواند 255 باشد' })
  title?: string;

  @ApiPropertyOptional({
    type: [String],
    isArray: true,
    required: false,
    nullable: true,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'ارایه برند ها نمیتواند خالی باشد' })
  @IsArray({ message: 'برند ها ارسالی باید در ارایه باشد' })
  @IsUUID('4', { message: 'برند ها نامعتبر است', each: true })
  @IsOptional({ message: 'ارسال برند اختیاری است' })
  brand?: string[];

  @ApiPropertyOptional({
    type: [String],
    isArray: true,
    required: false,
    nullable: true,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'رنگ ها باید در ارایه باشد' })
  @IsArray({ message: 'رنگ ها باید در ارایه باشد' })
  @IsHexColor({ message: 'شناسه رنگ ها نامعتبر است', each: true })
  @IsOptional({ message: 'رنگ ها اختیاری است' })
  colors?: string[];

  @ApiPropertyOptional({
    type: String,
    enum: ProductTypeEnum,
    required: false,
    nullable: true,
    example: ProductTypeEnum.DIGITAL,
  })
  @IsNotEmpty({ message: 'نوع محصول نمیتواند خالی باشد' })
  @IsEnum(ProductTypeEnum, { message: 'نوع محصول نامعتبر است' })
  @IsOptional({ message: 'نوع محصول اختیاری است' })
  product_type?: ProductTypeEnum;

  @ApiPropertyOptional({
    type: String,
    enum: ProductWarrantyTypeEnum,
    required: false,
    nullable: true,
    example: ProductWarrantyTypeEnum.PLATFORM,
  })
  @IsNotEmpty({ message: 'لطفا نوع گرانتی را مشخص کنید' })
  @IsEnum(ProductWarrantyTypeEnum, { message: 'نوع گارانتی نامعتبر است' })
  @IsOptional({ message: 'نوع گارانتی اختیاری است' })
  warranty_type?: ProductWarrantyTypeEnum;

  @ApiPropertyOptional({
    type: String,
    enum: ProductReturnPolicyTypeEnum,
    required: false,
    nullable: true,
    example: ProductReturnPolicyTypeEnum.EXTENDED,
  })
  @IsNotEmpty({ message: 'لطفا نوع بازگشت را مشخص کنید' })
  @IsEnum(ProductReturnPolicyTypeEnum, { message: 'نوع بازگشت نامعتبر است' })
  @IsOptional({ message: 'نوع بازگشت اختیاری است' })
  return_policy_type?: ProductReturnPolicyTypeEnum;

  @ApiPropertyOptional({
    type: Number,
    minimum: 0,
    nullable: true,
    example: 0,
  })
  @IsNotEmpty({ message: 'حدقل تعداد قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل وجودی نامعتبر است' },
  )
  @Min(0, { message: 'حدقل تعداد نمیتواند پاین تر از 0 باشد' })
  @IsOptional({ message: 'حدقل موجودی اختیاری است' })
  minimum_quantity?: number;

  @ApiPropertyOptional({
    type: Number,
    minimum: 0,
    nullable: true,
    example: 0,
  })
  @IsNotEmpty({ message: 'حدقل قیمت قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل قیمت نامعتبر است' },
  )
  @Min(0, { message: 'حدقل قیمت نمیتواند کمتر از 0 باشد' })
  @IsOptional({ message: 'حدقل قیمت اختیاری است' })
  min_price?: number;

  @ApiPropertyOptional({
    type: Number,
    minimum: 0,
    nullable: true,
    example: 1000000,
  })
  @IsNotEmpty({ message: 'حدکثر قیمت قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدکثر قیمت نامعتبر است' },
  )
  @Min(1_000_000, { message: 'حدکثر قیمت نمیتواند کوتر از 1000000 باشد' })
  @IsOptional({ message: 'حدکثر قیمت اختیاری است' })
  max_price?: number;
}
