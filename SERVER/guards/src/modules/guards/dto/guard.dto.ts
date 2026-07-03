import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { GuardEnum, MethodEnum } from '../../../common/enums/guards/guard.enum';

export class GuardDto {
  @IsNotEmpty({ message: 'متود نمیتواند خالی باشد' })
  @IsEnum(MethodEnum, { message: 'لطفا یک متود درست وارد کنید' })
  method: MethodEnum;

  @IsNotEmpty({ message: 'شناسه فیچر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه فیچر نامعتبر است' })
  feature: string;

  @IsNotEmpty({ message: 'شناسه پرمیژن نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه پرمیژن نامعتبر است' })
  permission: string;

  @IsBoolean({ message: 'لطفا عمومی بودن مسیر را با true, false مشخص کنید' })
  public: boolean;

  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message: 'سسرویس نامعتبر است',
  })
  service: GuardEnum;
}

export class ValidateGuard {
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;

  @IsNotEmpty({ message: 'متود نمیتواند خالی باشد' })
  @IsEnum(MethodEnum, { message: 'لطفا یک متود درست وارد کنید' })
  method: MethodEnum;

  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message: 'سوریس باید یکی از این موارد باشد (CORE, GUARD, PAYMENT)',
  })
  service: GuardEnum;
}
