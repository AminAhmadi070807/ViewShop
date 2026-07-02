import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { GuardEnum, MethodEnum } from '../../../common/enums/guards/guard.enum';

export class GuardDto {
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString()
  @Matches(/^\/api\/v\d\/(guards|core|payment)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;

  @IsNotEmpty({ message: 'متود نمیتواند خالی باشد' })
  @IsEnum(MethodEnum, { message: 'لطفا یک متود درست وارد کنید' })
  method: MethodEnum;

  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  roleId: string;

  @IsBoolean({ message: 'لطفا عمومی بودن مسیر را با true, false مشخص کنید' })
  public: boolean;

  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message: 'سوریس باید یکی از این موارد باشد (CORE, GUARD, PAYMENT)',
  })
  service: GuardEnum;
}

export class ValidateGuard {
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;

  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString({ message: 'مسیر باید رشته باشد' })
  @Matches(/^\/api\/v\d\/(guards|core|payment)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;

  @IsNotEmpty({ message: 'متود نمیتواند خالی باشد' })
  @IsEnum(MethodEnum, { message: 'لطفا یک متود درست وارد کنید' })
  method: MethodEnum;

  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message: 'سوریس باید یکی از این موارد باشد (CORE, GUARD, PAYMENT)',
  })
  service: GuardEnum;
}
