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
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusEnum } from '../../../../common/enums/products/status.enum';

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
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
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
    type: [String],
    isArray: true,
    required: true,
    nullable: false,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'ارایه رنگ ها نمیتواند خالی باشد' })
  @IsHexColor({ message: 'کد رنگ ها نامعتبر است', each: true })
  colors: string[];

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
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
    nullable: false,
    example: 0,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'قیمت محصول نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'قیمت محصول باید اعداد باشد' },
  )
  @Min(0, { message: 'قیمت محثول نمیتواند از 0 کوتاه تر باشد' })
  price: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 0,
    minimum: 0,
  })
  @IsNotEmpty({ message: '' })
  @IsNumber({ allowNaN: false, allowInfinity: true }, { message: '' })
  @Min(0, { message: '' })
  discount_amount: number;
}

export class UpdateProductDto {
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
  @IsEnum(ProductStatusEnum, {
    message:
      'وضیعت محصول فقط میتواند یکی از این موارد باشد (PENDING_APPROVAL, DELETED, DRAFT, INACTIVE, ACTIVE)',
  })
  status: ProductStatusEnum;
}
