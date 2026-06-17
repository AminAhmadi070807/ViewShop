import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ProductDto {
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

  // product price
  @IsNotEmpty({ message: 'قیمت محصول نمیتواند خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'قیمت محصول باید اعداد باشد' },
  )
  @Min(0, { message: 'قیمت محثول نمیتواند از 0 کوتاه تر باشد' })
  price: number;

  // product discount amount
  @IsNotEmpty({ message: '' })
  @IsNumber({ allowNaN: false, allowInfinity: true }, { message: '' })
  @Min(0, { message: '' })
  discount_amount: number;
}
