import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ZarinPalDto {
  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'مقدار باید عداد باشد' },
  )
  @IsInt({
    message: 'مقدار باید بالای 1000 تومان باشد',
  })
  @Min(1000, { message: 'حدقل مقدار 1000 تومان هستش' })
  amount: number;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'توضیحات حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(54, { message: 'توضیحات حدکثر میتواند 54 کارکتر داشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  user: string;
}
