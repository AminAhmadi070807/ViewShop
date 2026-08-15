import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';
import { Type } from 'class-transformer';

class ProductDetailDto {
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

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
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  userId: string;

  @ArrayNotEmpty({ message: 'ارایه فیلتر ها نمیتواند خالی باشد' })
  @IsArray({ message: 'فیلترس باید ارایه باشد' })
  @IsUUID('4', { message: 'شناسه فیلترس نامعتبر است', each: true })
  filters: string[];

  @IsNotEmpty({ message: 'ایدی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  store: string;

  @IsNotEmpty({ message: 'ایدی محصول اصلی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول اصلی را به درستی وارد کنید' })
  parentProductId: string;

  @ArrayNotEmpty({ message: 'لطفا ایدی مدیا  نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا ها باید ارایه باشد' })
  @IsUUID('4', { each: true, message: 'لطفا ایدی مدیا های معتبری وارد کنید' })
  medias: string[];

  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @MinLength(9, { message: 'نام مستعار حدقل باید 9 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'نام مستعار حدکثر میتواند 255 کارکتر داشته باشد' })
  @Matches(/^[a-zA-Z0-9-_]{9,255}$/, {
    message: 'لطفا برای نام مستعار از کلمات انگلیسی استفاده کنید',
  })
  alias: string;

  @ArrayNotEmpty({ message: 'جزئیات نمیتواند خالی بشاد' })
  @IsArray({ message: 'جزئیات باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  details: ProductDetailDto[];

  @IsNotEmpty({ message: '' })
  @IsNumber({ allowNaN: false, allowInfinity: true }, { message: '' })
  @Min(0, { message: '' })
  discount_amount: number;
}

export class UpdateProductDto {
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

  @ArrayNotEmpty({ message: 'لطفا ایدی مدیا  نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا ها باید ارایه باشد' })
  @IsUUID('4', { each: true, message: 'لطفا ایدی مدیا های معتبری وارد کنید' })
  medias: string[];

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
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductStatusEnum, { message: 'وضیعت نامعتبر است' })
  status: ProductStatusEnum;
}

export class UpdateStockProductDto {
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  product_detail_id: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'موجودی محصول باید نامبر باشد' },
  )
  stock: number;
}
