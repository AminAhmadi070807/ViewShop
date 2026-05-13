import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GuardDto {
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString()
  patch: string;

  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsUUID()
  roleId: string;

  @IsBoolean({ message: 'لطفا عمومی بودن مسیر را با true, false مشخص کنید' })
  public: boolean;
}

export class ValidateGuard {
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  patch: string;
}

export class UpdateGuardDto {}
