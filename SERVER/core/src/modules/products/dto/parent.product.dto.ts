import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  ProductReturnPolicyTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../common/enums/products/product/type.enum';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';

export class ParentProductDto {
  @IsNotEmpty({ message: 'ایدی کاربر نباید خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاربر نادرس است' })
  userId: string;

  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید' })
  category: string;

  @IsArray({ message: 'شناسه های زیر درسته بندی باید در ارایه ارسال شوند' })
  @IsUUID('4', { message: 'شناسه زیر دسته نامعتبر است', each: true })
  subCategories: string[];

  @IsNotEmpty({ message: 'ایدی اتریبیوت ها نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی اتریبیوت هارا در ارایه ارسال کنید' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید', each: true })
  attributes: string[];

  @IsNotEmpty({ message: 'لطفا ایدی مدیا نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا هارا در ارایه ارسال کنید' })
  @IsUUID('4', { message: 'لطفا ایدی مدیا را درست وارد کنید', each: true })
  media: string[];

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(9, { message: 'حدقل کارکتر عنوان باید 9 رشته باشد' })
  @MaxLength(255, { message: 'حدکثر کارتر عنوان میتواند 255 باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(255, { message: 'حدقل توضیحات میتواند 255 کارکتر داشته باشد' })
  @MaxLength(5000, { message: 'حدکثر توضیحات میتواند 5000 کارکتر داشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @MinLength(9, { message: 'نام مستعار حدقل باید 9 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'نام مستعار حدکثر میتواند 255 کارکتر داشته باشد' })
  alias: string;

  // product stock quantity
  @IsNotEmpty({ message: 'مقدار موجودی نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'مقدار موجودی باید اعداد باشد' },
  )
  @Min(0)
  stock_quantity: number;

  // product type
  @IsNotEmpty({ message: 'نوع محصول نمیتواند خالی باشد' })
  @IsEnum(ProductTypeEnum, {
    message:
      'نوع محصول باید یکی از این موارد باشد (PHYSICAL, DIGITAL, SERVICE, BUNDLE)',
  })
  product_type: ProductTypeEnum;

  @IsNotEmpty({ message: 'لطفا پورسانت مالیات را مشخص کنید' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'لطفا مالیات را بین 0 تا 100 تاین کنید' },
  )
  @Min(0, { message: 'حدقل پورسانت مالیات 0 میباشد' })
  @Max(100, { message: 'حداکثر پورسانت مالیات 100 میباشد' })
  tax_percent: number;

  // product warranty type
  @IsNotEmpty({ message: 'لطفا نوع گرانتی را مشخص کنید' })
  @IsEnum(ProductWarrantyTypeEnum, {
    message:
      'نوع گرانتی میتواند یکی از این موارد باشد (MANUFACTURER, SELLER, PLATFORM, NO_WARRANTY)',
  })
  warranty_type: ProductWarrantyTypeEnum;

  // product return policy type
  @IsNotEmpty({ message: 'لطفا نوع بازگشت را مشخص کنید' })
  @IsEnum(ProductReturnPolicyTypeEnum, {
    message:
      'نوع بازگشت میتواند یکی از این موارد باشد (STANDARD, EXTENDED, NO_RETURN, EXCHANGE_ONLY)',
  })
  return_policy_type: ProductReturnPolicyTypeEnum;

  // product minimum quantity
  @IsNotEmpty({ message: 'حدقل تعداد قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل تعداد باید اعداد باشد' },
  )
  @Min(0, { message: 'حدقل تعداد نمیتواند پاین تر از 0 باشد' })
  minimum_quantity: number;
}

export class UpdateParentProductDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  id: string;

  @IsNotEmpty({ message: 'لطفا ایدی مدیا نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا هارا در ارایه ارسال کنید' })
  @IsUUID('4', { message: 'لطفا ایدی مدیا را درست وارد کنید', each: true })
  media: string[];

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(9, { message: 'حدقل کارکتر عنوان باید 9 رشته باشد' })
  @MaxLength(255, { message: 'حدکثر کارتر عنوان میتواند 255 باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(255, { message: 'حدقل توضیحات میتواند 255 کارکتر داشته باشد' })
  @MaxLength(5000, { message: 'حدکثر توضیحات میتواند 5000 کارکتر داشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید' })
  category: string;

  @IsNotEmpty({ message: 'ایدی زیر دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید' })
  subCategory: string;

  @IsNotEmpty({ message: 'ایدی اتریبیوت ها نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی اتریبیوت هارا در ارایه ارسال کنید' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید', each: true })
  attributes: string[];

  // product status
  @IsNotEmpty({ message: 'وضیعت نمیتواند خالی باشد' })
  @IsEnum(ProductStatusEnum, {
    message:
      'وضیعت باید یکی از این موارد باشد (ACTIVE, INACTIVE, DRAFT, DELETED, PENDING_APPROVAL)',
  })
  status: ProductStatusEnum;

  // product return policy type
  @IsNotEmpty({ message: 'لطفا نوع بازگشت را مشخص کنید' })
  @IsEnum(ProductReturnPolicyTypeEnum, {
    message:
      'نوع بازگشت میتواند یکی از این موارد باشد (STANDARD, EXTENDED, NO_RETURN, EXCHANGE_ONLY)',
  })
  return_policy_type: ProductReturnPolicyTypeEnum;

  // product minimum price
  @IsNotEmpty({ message: 'حدقل فیمت قابل فروش نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل قیمت محصول قابل فروش باید اعداد باشد' },
  )
  @Min(1000, { message: 'حدکثر قیمت نمیتواند پاین تر از 1000 تومان باشد' })
  min_price: number;

  // product maximum price
  @IsNotEmpty({ message: 'حدقل فیمت قابل فروش نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدکثر قیمت محصول قابل فروش باید اعداد باشد' },
  )
  max_price: number;
}
