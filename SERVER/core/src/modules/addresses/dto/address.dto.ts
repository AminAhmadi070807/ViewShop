import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی  نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یه ایدی درست وارد کنید' })
  user: string;

  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  @IsString({ message: 'استان باید رشته باشد' })
  @MinLength(5, { message: 'استان حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'استان حدکثر باید 100 کارکتر داشته باشد' })
  province: string;

  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  @IsString({ message: 'شهر باید رشته باشد' })
  @MinLength(3, { message: 'شهر حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'شهر حدکثر باید 100 کارکتر داشته باشد' })
  city: string;

  @IsNotEmpty({ message: 'خیابان نمیتواند خالی باشد' })
  @IsString({ message: 'خیابان باید رشته باشد' })
  @MinLength(5, { message: 'خیابان حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'خیابان حدکثر باید 100 کارکتر داشته باشد' })
  street: string;

  @IsNotEmpty({ message: 'کوچه نمیتواند خالی باشد' })
  @IsString({ message: 'کوچه باید رشته باشد' })
  @MinLength(5, { message: 'کوچه حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'کوچه حدکثر باید 100 کارکتر داشته باشد' })
  alley: string;

  @IsNotEmpty({ message: 'آدرس نمیتواند خالی باشد' })
  @IsString({ message: 'آدرس باید رشته باشد' })
  @MinLength(5, { message: 'آدرس حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(255, { message: 'آدرس حدکثر باید 255 کارکتر داشته باشد' })
  address: string;

  @IsNotEmpty({ message: 'کد پستی نمیتواند خالی باشد' })
  @Matches(/^[0-9]{10}$/, { message: 'لطفا یه کد پستی درست وارد کنید' })
  postal_code: string;
}
