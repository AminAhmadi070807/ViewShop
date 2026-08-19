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
} from '../../../common/enums/products/product/type.enum';

export class ProductFilterDto {
  @IsOptional()
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'حدقل کارکتر عنوان باید 3 رشته باشد' })
  @MaxLength(255, { message: 'حدکثر کارتر عنوان میتواند 255 باشد' })
  title?: string;

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @ArrayNotEmpty({ message: 'ارایه برند ها نمیتواند خالی باشد' })
  @IsArray({ message: 'برند ها ارسالی باید در ارایه باشد' })
  @IsUUID('4', { message: 'برند ها نامعتبر است', each: true })
  brand?: string[];

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @ArrayNotEmpty({ message: 'رنگ ها باید در ارایه باشد' })
  @IsArray({ message: 'رنگ ها باید در ارایه باشد' })
  @IsHexColor({ message: 'شناسه رنگ ها نامعتبر است', each: true })
  colors?: string[];

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @IsNotEmpty({ message: 'نوع محصول نمیتواند خالی باشد' })
  @IsEnum(ProductTypeEnum, { message: 'نوع محصول نامعتبر است' })
  product_type?: ProductTypeEnum;

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @IsNotEmpty({ message: 'لطفا نوع گرانتی را مشخص کنید' })
  @IsEnum(ProductWarrantyTypeEnum, { message: 'نوع گارانتی نامعتبر است' })
  warranty_type?: ProductWarrantyTypeEnum;

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @IsNotEmpty({ message: 'لطفا نوع بازگشت را مشخص کنید' })
  @IsEnum(ProductReturnPolicyTypeEnum, { message: 'نوع بازگشت نامعتبر است' })
  return_policy_type?: ProductReturnPolicyTypeEnum;

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @IsNotEmpty({ message: 'حدقل تعداد قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل وجودی نامعتبر است' },
  )
  @Min(0, { message: 'حدقل تعداد نمیتواند پاین تر از 0 باشد' })
  minimum_quantity?: number;

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @IsNotEmpty({ message: 'حدقل قیمت قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل قیمت نامعتبر است' },
  )
  @Min(0, { message: 'حدقل قیمت نمیتواند کمتر از 0 باشد' })
  min_price?: number;

  @IsOptional({ message: 'ارسال برند اختیاری است' })
  @IsNotEmpty({ message: 'حدکثر قیمت قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدکثر قیمت نامعتبر است' },
  )
  @Min(1_000_000, { message: 'حدکثر قیمت نمیتواند کوتر از 1000000 باشد' })
  max_price?: number;
}
