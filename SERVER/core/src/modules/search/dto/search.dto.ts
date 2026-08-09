import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
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
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(9, { message: 'حدقل کارکتر عنوان باید 9 رشته باشد' })
  @MaxLength(255, { message: 'حدکثر کارتر عنوان میتواند 255 باشد' })
  title?: string;

  @ArrayNotEmpty({ message: 'ارایه برند ها نمیتواند خالی باشد' })
  @IsArray({ message: 'برند ها ارسالی باید در ارایه باشد' })
  @IsUUID('4', { message: 'برند ها نامعتبر است', each: true })
  @IsOptional({ message: 'ارسال برند اختیاری است' })
  brand?: string[];

  @ArrayNotEmpty({ message: 'رنگ ها باید در ارایه باشد' })
  @IsArray({ message: 'رنگ ها باید در ارایه باشد' })
  @IsUUID('4', { message: 'شناسه رنگ ها نامعتبر است', each: true })
  @IsOptional({ message: 'رنگ ها اختیاری است' })
  colors?: string[];

  @IsNotEmpty({ message: 'نوع محصول نمیتواند خالی باشد' })
  @IsEnum(ProductTypeEnum, { message: 'نوع محصول نامعتبر است' })
  @IsOptional({ message: 'نوع محصول اختیاری است' })
  product_type?: ProductTypeEnum;

  @IsNotEmpty({ message: 'لطفا نوع گرانتی را مشخص کنید' })
  @IsEnum(ProductWarrantyTypeEnum, { message: 'نوع گارانتی نامعتبر است' })
  @IsOptional({ message: 'نوع گارانتی اختیاری است' })
  warranty_type?: ProductWarrantyTypeEnum;

  @IsNotEmpty({ message: 'لطفا نوع بازگشت را مشخص کنید' })
  @IsEnum(ProductReturnPolicyTypeEnum, { message: 'نوع بازگشت نامعتبر است' })
  @IsOptional({ message: 'نوع بازگشت اختیاری است' })
  return_policy_type?: ProductReturnPolicyTypeEnum;

  @IsNotEmpty({ message: 'حدقل تعداد قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل وجودی نامعتبر است' },
  )
  @Min(0, { message: 'حدقل تعداد نمیتواند پاین تر از 0 باشد' })
  @IsOptional({ message: 'حدقل موجودی اختیاری است' })
  minimum_quantity?: number;
}
