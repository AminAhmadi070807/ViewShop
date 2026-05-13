import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class GuardDto {
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString()
  patch: string;

  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  roleId: string;

  @IsBoolean({ message: 'لطفا عمومی بودن مسیر را با true, false مشخص کنید' })
  public: boolean;
}

export class ValidateGuard {
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;

  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString({ message: 'مسیر باید رشته باشد' })
  @Matches(/^api\/v\d\/(guards|core|admin|payment|seller)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;
}

export class UpdateGuardDto {}
