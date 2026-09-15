import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class DiscountDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی بلاشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'کد نمیتواند خالی باشد' })
  @IsString({ message: 'کد نامعتبر است' })
  code: string;

  @IsNumber({}, { message: 'سقف مجاز استفاده نامعتبر است' })
  @IsPositive({ message: 'سقف مجاز استفاده نامعتبر است' })
  permitted: string;

  @IsNumber({}, { message: 'درصد تخفیف نامعتبر است' })
  @Min(0, { message: 'درصد تخفیف نامعتبر است' })
  @Max(10, { message: 'درصد تخفیف نامعتبر است' })
  percent: string;

  @IsNumber({}, { message: 'حدکثر مبلغ تخفیف نامعتبر است' })
  @Min(0, { message: 'حدکثر مبلغ تخفیف نامعتبر است' })
  max_discount: string;

  @IsOptional()
  @IsPhoneNumber('IR', { message: 'شماره تلفن نامعتبر است' })
  user_phone?: string;

  @IsDate({ message: 'تاریخ انقضا نامعتبر است' })
  expiration: string;
}
