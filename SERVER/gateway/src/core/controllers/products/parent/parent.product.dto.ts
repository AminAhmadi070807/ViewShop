import {
  ArrayNotEmpty,
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
  ProductReturnPolicyTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../../common/enums/products/type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ParentProductDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید' })
  category: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی زیر دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید' })
  subCategory: string;

  @ApiProperty({
    type: [String],
    required: true,
    nullable: true,
    example: [''],
    isArray: true,
  })
  @ArrayNotEmpty({ message: 'ایدی اتریبیوت ها نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی اتریبیوت هارا در ارایه ارسال کنید' })
  @IsUUID('4', { message: 'لطفا ایدی دسته بندی درست وارد کنید', each: true })
  attributes: string[];

  @ApiProperty({
    type: [String],
    required: true,
    nullable: true,
    example: [''],
    isArray: true,
  })
  @ArrayNotEmpty({ message: 'لطفا ایدی مدیا نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا هارا در ارایه ارسال کنید' })
  @IsUUID('4', { message: 'لطفا ایدی مدیا را درست وارد کنید', each: true })
  media: string[];

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(9, { message: 'حدقل کارکتر عنوان باید 9 رشته باشد' })
  @MaxLength(255, { message: 'حدکثر کارتر عنوان میتواند 255 باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(255, { message: 'حدقل توضیحات میتواند 255 کارکتر داشته باشد' })
  @MaxLength(5000, { message: 'حدکثر توضیحات میتواند 5000 کارکتر داشته باشد' })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
  })
  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @MinLength(9, { message: 'نام مستعار حدقل باید 9 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'نام مستعار حدکثر میتواند 255 کارکتر داشته باشد' })
  @Matches(/^[a-zA-Z0-9-_]{9,255}$/, {
    message: 'لطفا برای نام مستعار از کلمات انگلیسی استفاده کنید',
  })
  alias: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: true,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'مقدار موجودی نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'مقدار موجودی باید اعداد باشد' },
  )
  @Min(1)
  stock_quantity: number;

  // product type
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    enum: ProductTypeEnum,
    example: ProductTypeEnum.DIGITAL,
  })
  @IsNotEmpty({ message: 'نوع محصول نمیتواند خالی باشد' })
  @IsEnum(ProductTypeEnum, {
    message:
      'نوع محصول باید یکی از این موارد باشد (PHYSICAL, DIGITAL, SERVICE, BUNDLE)',
  })
  product_type: ProductTypeEnum;

  // product tax amount
  @ApiProperty({
    type: Number,
    required: true,
    nullable: true,
    example: 1,
    minimum: 1,
    maximum: 100,
  })
  @IsNotEmpty({ message: 'لطفا پورسانت مالیات را مشخص کنید' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'لطفا مالیات را بین 0 تا 100 تاین کنید' },
  )
  @Min(1, { message: 'حدقل پورسانت مالیات 0 میباشد' })
  @Max(100, { message: 'حداکثر پورسانت مالیات 100 میباشد' })
  tax_percent: number;

  // product warranty type
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: ProductWarrantyTypeEnum.PLATFORM,
    enum: ProductWarrantyTypeEnum,
  })
  @IsNotEmpty({ message: 'لطفا نوع گرانتی را مشخص کنید' })
  @IsEnum(ProductWarrantyTypeEnum, {
    message:
      'نوع گرانتی میتواند یکی از این موارد باشد (MANUFACTURER, SELLER, PLATFORM, NO_WARRANTY)',
  })
  warranty_type: ProductWarrantyTypeEnum;

  // product return policy type
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: ProductReturnPolicyTypeEnum.STANDARD,
    enum: ProductReturnPolicyTypeEnum,
  })
  @IsNotEmpty({ message: 'لطفا نوع بازگشت را مشخص کنید' })
  @IsEnum(ProductReturnPolicyTypeEnum, {
    message:
      'نوع بازگشت میتواند یکی از این موارد باشد (STANDARD, EXTENDED, NO_RETURN, EXCHANGE_ONLY)',
  })
  return_policy_type: ProductReturnPolicyTypeEnum;

  // product minimum quantity
  @ApiProperty({
    type: Number,
    required: true,
    nullable: true,
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'حدقل تعداد قابل ثبت' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل تعداد باید اعداد باشد' },
  )
  @Min(1, { message: 'حدقل تعداد نمیتواند پاین تر از 0 باشد' })
  minimum_quantity: number;

  // product minimum price
  @ApiProperty({
    type: Number,
    required: true,
    nullable: true,
    example: 1,
    minimum: 1_000,
  })
  @IsNotEmpty({ message: 'حدقل فیمت قابل فروش نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدقل قیمت محصول قابل فروش باید اعداد باشد' },
  )
  @Min(1000, { message: 'حدکثر قیمت نمیتواند پاین تر از 1000 تومان باشد' })
  min_price: number;

  // product maximum price
  @ApiProperty({
    type: Number,
    required: true,
    nullable: true,
    example: 0,
  })
  @IsNotEmpty({ message: 'حدقل فیمت قابل فروش نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'حدکثر قیمت محصول قابل فروش باید اعداد باشد' },
  )
  max_price: number;
}
