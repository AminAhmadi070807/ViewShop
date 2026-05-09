import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  @ApiProperty({
    description: 'User phone number',
    example: '09141111111',
    type: 'string',
    required: true,
    maxLength: 11,
    minLength: 11,
  })
  @IsNotEmpty({ message: 'شماره تلفن نمیتواند خالی باشد' })
  @IsString({ message: 'لطفا یک شماره تلفن درست وارد کنید' })
  @IsPhoneNumber('IR', { message: 'لطفا یک شماره تلفن درست وارد کنید' })
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: '123456789',
    type: 'string',
    required: true,
    maxLength: 24,
    minLength: 8,
  })
  @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
  @IsString({ message: 'رمز عبور نمیتواند خالی باشد' })
  @MinLength(8, { message: 'رمزعبور حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'رمزعبور نمیتواند بیشتر از 24 کارکتر باشد' })
  password: string;

  @ApiProperty({
    description: 'User fullName',
    example: 'امین احمدی',
    type: 'string',
    required: true,
    maxLength: 50,
    minLength: 8,
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

export class AuthVerifyOtp {
  @ApiProperty({
    description: 'otp code',
    type: 'string',
    required: true,
    maxLength: 6,
    minLength: 6,
  })
  @IsNotEmpty({ message: 'لطفا کد ورودی درست را وارد کنید' })
  @IsString({ message: 'کد ورود باید عداد باشد' })
  @MinLength(6, { message: 'کدقل و حدکثر کد ورود باید 6 رقم باشد' })
  @MaxLength(6, { message: 'کدقل و حدکثر کد ورود باید 6 رقم باشد' })
  otp: string;
}

export class AuthLoginDto {
  @ApiProperty({
    description: 'User phone number',
    example: '09141111111',
    type: 'string',
    required: true,
    maxLength: 11,
    minLength: 11,
  })
  @IsNotEmpty({ message: 'شماره تلفن نمیتواند خالی باشد' })
  @IsString({ message: 'لطفا یک شماره تلفن درست وارد کنید' })
  @IsPhoneNumber('IR', { message: 'لطفا یک شماره تلفن درست وارد کنید' })
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: '123456789',
    type: 'string',
    required: true,
    maxLength: 24,
    minLength: 8,
  })
  @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
  @IsString({ message: 'رمز عبور نمیتواند خالی باشد' })
  @MinLength(8, { message: 'رمزعبور حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'رمزعبور نمیتواند بیشتر از 24 کارکتر باشد' })
  password: string;
}
