import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserValidator {
  @ApiProperty({
    type: 'string',
    example: '0999000000',
    description: 'phone number is required',
    pattern: /^09(0[1-5]|1\d|2[0-2]|3\d|9[^567])\d{7}$/,
  })
  @IsNotEmpty({ message: 'شماره تلفن نمیتواند خالی باشد' })
  @IsString({ message: 'لطفا یک شماره تلفن درست وارد کنید' })
  @IsPhoneNumber('IR', { message: 'لطفا یک شماره تلفن درست وارد کنید' })
  phone: string;

  @ApiProperty({
    type: 'string',
    minLength: 8,
    maxLength: 24,
    description: 'user password is required',
    example: '123456789',
  })
  @IsNotEmpty({ message: 'رمزعبور نباید خالی باشد' })
  @IsString({ message: 'رمزعبور باید رشته باشد' })
  @MinLength(8, { message: 'حدقل باید رمز عبور 8 کارکتری باشد' })
  @MaxLength(24, { message: 'حدکثر رمزعبور باید 24 کارکتری باشد' })
  password: string;

  @ApiPropertyOptional({
    type: 'string',
    minLength: 8,
    maxLength: 50,
    description: 'fullName is optional',
    example: 'امین احمدی',
  })
  @IsNotEmpty({ message: 'نام و نام خانوادگی نباید خالی باشد' })
  @IsString({ message: 'نام و نام خانوادگی باید رشته باشد' })
  @MinLength(8, { message: 'نام و نام خانوادگی حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'نام و نام خانوادگی حدکثر میتواند 50 کارکتر باشد' })
  @Matches(/^[\u0600-\u06FF\s]+$/, {
    message: 'فقط حروف فارسی مجاز است',
  })
  fullName: string;
}

export class UserUpdateValidator {
  @ApiProperty({
    type: 'string',
    minLength: 8,
    maxLength: 50,
    description: 'fullName is optional',
    example: 'امین احمدی',
  })
  @IsNotEmpty({ message: 'نام و نام خانوادگی نباید خالی باشد' })
  @IsString({ message: 'نام و نام خانوادگی باید رشته باشد' })
  @MinLength(8, { message: 'نام و نام خانوادگی حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'نام و نام خانوادگی حدکثر میتواند 50 کارکتر باشد' })
  @Matches(/^[\u0600-\u06FF\s]+$/, {
    message: 'فقط حروف فارسی مجاز است',
  })
  fullName: string;
}
