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
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';
import { Type } from 'class-transformer';

class ProductDetailDto {
  @IsOptional()
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id?: string;

  @IsHexColor({ message: 'رنگ نامعتبر است' })
  color: string;

  @IsNotEmpty({ message: 'قیمت نمیتواند خالی بشاد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'قیمت نامعتبر است' },
  )
  price: number;

  @IsNotEmpty({ message: 'تعداد موجودی نمیتواند خالی بشاد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'تعداد موجودی نامعتبر است' },
  )
  stock: number;
}

export class ProductDto {
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  userId: string;

  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  store: string;

  @IsNotEmpty({ message: 'عنوان محصول نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان محصول باید رشته باشد' })
  @MinLength(8, { message: 'عنوان نمیتواند کمتر از 8 کارکتر باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات محصول نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات محصول باید رشته باشد' })
  @MinLength(255, { message: 'توضیحات نمیتواند کمتر از 255 کارکتر باشد' })
  description: string;

  @IsUUID('4', { message: 'شناسه برند نامعتبر است' })
  brand: string;

  @ArrayNotEmpty({ message: 'ارایه فیلتر ها نمیتواند خالی باشد' })
  @IsArray({ message: 'فیلترس باید ارایه باشد' })
  @IsUUID('4', { message: 'شناسه فیلترس نامعتبر است', each: true })
  filters: string[];

  @ArrayNotEmpty({ message: 'لطفا ایدی مدیا  نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا ها باید ارایه باشد' })
  @IsUUID('4', { each: true, message: 'لطفا ایدی مدیا های معتبری وارد کنید' })
  medias: string[];

  @ArrayNotEmpty({ message: 'جزئیات نمیتواند خالی بشاد' })
  @IsArray({ message: 'جزئیات باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  details: ProductDetailDto[];

  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @MinLength(9, { message: 'نام مستعار حدقل باید 9 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'نام مستعار حدکثر میتواند 255 کارکتر داشته باشد' })
  alias: string;

  @IsNotEmpty({ message: 'لطفا درصد تخفیف را وارد کنید' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'درصد تخفیف باید اعداد باشد' },
  )
  @Min(0, { message: 'درصد تخفیف نامعتبر است' })
  @Max(100, { message: 'درصد تخفیف نامعتبر است' })
  discount_percent: number;
}

export class UpdateProductDto {
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

  @ArrayNotEmpty({ message: 'لطفا ایدی مدیا  نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا ها باید ارایه باشد' })
  @IsUUID('4', { each: true, message: 'لطفا ایدی مدیا های معتبری وارد کنید' })
  medias: string[];

  @IsNotEmpty({ message: 'عنوان محصول نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان محصول باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات محصول نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات محصول باید رشته باشد' })
  description: string;

  @ArrayNotEmpty({ message: 'جزئیات نمیتواند خالی بشاد' })
  @IsArray({ message: 'جزئیات باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  details: ProductDetailDto[];

  @IsNotEmpty({ message: 'لطفا درصد تخفیف را وارد کنید' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'درصد تخفیف باید اعداد باشد' },
  )
  @Min(0, { message: 'حدثل درصد تخفیف 0 هست' })
  @Max(100, { message: 'درصد تخفیف نمیتواند بالاتر از 100 باشد' })
  discount_percent: number;
}

export class UpdateStatusProductDto {
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'وضیعت محصول نمیتواند خالی باشد' })
  @IsEnum(ProductStatusEnum, { message: 'وضیعت محصول نامعتبر است' })
  status: ProductStatusEnum;
}

export class UpdateStockProductDto {
  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  id: string;

  @IsUUID('4', { message: 'شناسه دیتا نامعتبر است' })
  product_detail_id: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'موجودی محصول باید نامبر باشد' },
  )
  stock: number;
}
