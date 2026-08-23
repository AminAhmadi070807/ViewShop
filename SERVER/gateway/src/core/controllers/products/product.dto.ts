import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusEnum } from '../../../common/enums/products/status.enum';
import { Type } from 'class-transformer';

class ProductDetailDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsHexColor({ message: 'رنگ نامعتبر است' })
  color: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    minimum: 0,
    example: 1_000_000,
  })
  @IsNotEmpty({ message: 'قیمت نمیتواند خالی بشاد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'قیمت نامعتبر است' },
  )
  price: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    minimum: 0,
    example: 1_000,
  })
  @IsNotEmpty({ message: 'تعداد موجودی نمیتواند خالی بشاد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'تعداد موجودی نامعتبر است' },
  )
  stock: number;
}

export class ProductDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی کاربر درست وارد کنید' })
  store: string;

  @ApiProperty({
    type: [String],
    required: true,
    nullable: false,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'ارایه فیلتر ها نمیتواند خالی باشد' })
  @IsArray({ message: 'فیلترس باید ارایه باشد' })
  @IsUUID('4', { message: 'شناسه فیلترس نامعتبر است', each: true })
  filters: string[];

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه برند نامعتبر است', each: true })
  brand: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'ایدی محصول اصلی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول اصلی را به درستی وارد کنید' })
  parentProductId: string;

  @ApiProperty({
    type: [String],
    required: true,
    nullable: false,
    example: [''],
    isArray: true,
  })
  @ArrayNotEmpty({ message: 'لطفا ایدی مدیا  نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا ها باید ارایه باشد' })
  @IsUUID('4', { each: true, message: 'لطفا ایدی مدیا های معتبری وارد کنید' })
  medias: string[];

  @ApiProperty({
    type: () => ProductDetailDto,
    isArray: true,
    required: true,
    nullable: false,
    example: ProductDetailDto,
  })
  @ArrayNotEmpty({ message: 'جزئیات نمیتواند خالی بشاد' })
  @IsArray({ message: 'جزئیات باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  details: ProductDetailDto[];

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @MinLength(9, { message: 'نام مستعار حدقل باید 9 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'نام مستعار حدکثر میتواند 255 کارکتر داشته باشد' })
  alias: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 0,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'درصد تخفیف نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'درصد تخفیف باید اعداد باشد' },
  )
  @Min(0, { message: 'درصد تخفیف نامعتبر است' })
  @Max(100, { message: 'درصد تخفیف نامعتبر است' })
  discount_percent: number;
}

export class UpdateProductDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

  @ApiProperty({
    type: [String],
    required: true,
    nullable: false,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'لطفا ایدی مدیا  نمیتواند خالی باشد' })
  @IsArray({ message: 'ایدی مدیا ها باید ارایه باشد' })
  @IsUUID('4', { each: true, message: 'لطفا ایدی مدیا های معتبری وارد کنید' })
  medias: string[];

  @ApiProperty({
    type: () => ProductDetailDto,
    isArray: true,
    required: true,
    nullable: false,
    example: ProductDetailDto,
  })
  @ArrayNotEmpty({ message: 'جزئیات نمیتواند خالی بشاد' })
  @IsArray({ message: 'جزئیات باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  details: ProductDetailDto[];

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 0,
  })
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
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا ایدی محصول نامعتبر هست' })
  id: string;

  @ApiProperty({
    type: String,
    enum: ProductStatusEnum,
    example: ProductStatusEnum.ACTIVE,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductStatusEnum, { message: 'وضیعت وحصول نامعتبر است' })
  status: ProductStatusEnum;
}
