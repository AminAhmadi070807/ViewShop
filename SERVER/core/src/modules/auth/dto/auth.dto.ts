import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty({ message: 'شماره تلفن نمیتواند خالی باشد' })
  @IsString({ message: 'لطفا یک شماره تلفن درست وارد کنید' })
  @IsPhoneNumber('IR', { message: 'لطفا یک شماره تلفن درست وارد کنید' })
  phone: string;

  @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
  @IsString({ message: 'رمز عبور باید رشته باشد' })
  @MinLength(8, { message: 'رمز عبور حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'رمز عبور نمیتواند بیشتر از 24 کارکتر داشته باشد' })
  password: string;

  @IsNotEmpty({ message: 'نام و نام خانوادگی نمیتواند خالی باشد' })
  @IsString({ message: 'نام و نام خانوادگی باید رشته باشد' })
  @MinLength(8, { message: 'نام و نام خانوادگی حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(50, {
    message: 'نام و نام خانوادگی نمیتواند بیشتر از 50 کارکتر داشته باشد',
  })
  fullName: string;
}

export class AuthValidateDto {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;

  @IsNotEmpty({ message: 'رمز نمیتواند خالی باشد' })
  @IsString({ message: 'رمز باید رشته باشد' })
  secret: string;
}

export class AuthLoginDto {
  @IsNotEmpty({ message: 'شماره تلفن نمیتواند خالی باشد' })
  @IsString({ message: 'لطفا یک شماره تلفن درست وارد کنید' })
  @IsPhoneNumber('IR', { message: 'لطفا یک شماره تلفن درست وارد کنید' })
  phone: string;

  @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
  @IsString({ message: 'رمز عبور باید رشته باشد' })
  @MinLength(8, { message: 'رمز عبور حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'رمز عبور نمیتواند بیشتر از 24 کارکتر داشته باشد' })
  password: string;
}

export class AuthVerifyOtp {
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک مسیر معتبر وارد کنید' })
  route: string;

  @IsNotEmpty({ message: 'کد تاید نمیتواند خالی باشد' })
  @IsString({ message: 'کد تاید باید رشته باشد' })
  @MinLength(6, { message: 'کد تاید حدقل باید 6 کارکتر داشته باشد' })
  @MaxLength(6, { message: 'کد تاید نمیتواند بیشتر از 6 کارکتر داشته باشد' })
  otp: string;
}
