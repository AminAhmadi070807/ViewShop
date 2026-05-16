import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { GuardEnum } from '../../../common/enums/guards/guard.enum';

export class GuardDto {
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString()
  @Matches(/^\/api\/v\d\/(guards|core|admin|payment|seller)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;

  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  roleId: string;

  @IsBoolean({ message: 'لطفا عمومی بودن مسیر را با true, false مشخص کنید' })
  public: boolean;

  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message:
      'سوریس باید یکی از این موارد باشد (CORE, GUARD, ADMIN, SELLER, PAYMENT)',
  })
  service: GuardEnum;

  @IsNotEmpty({ message: 'پترن نمیتواند خالی باشد' })
  @IsString({ message: 'پترن باید رشته باشد' })
  pattern: string;
}

export class ValidateGuard {
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;

  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString({ message: 'مسیر باید رشته باشد' })
  @Matches(/^\/api\/v\d\/(guards|core|admin|payment|seller)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;

  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message:
      'سوریس باید یکی از این موارد باشد (CORE, GUARD, ADMIN, SELLER, PAYMENT)',
  })
  service: GuardEnum;

  @IsOptional({ message: 'دیتا اختیاری هست' })
  data: unknown;
}
