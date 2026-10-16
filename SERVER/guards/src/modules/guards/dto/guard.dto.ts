import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { GuardEnum, MethodEnum } from '../../../common/enums/guards/guard.enum';

export class GuardDto {
  @IsEnum(MethodEnum, { message: 'متود انتخابی نامعتبر است' })
  method: MethodEnum;

  @IsUUID('4', { message: 'شناسه فیچر نامعتبر است' })
  feature: string;

  @IsUUID('4', { message: 'شناسه پرمیژن نامعتبر است' })
  permission: string;

  @IsBoolean({ message: 'ازاد بودن مسیر نامعتبر است' })
  public: boolean;

  @IsEnum(GuardEnum, { message: 'سسرویس نامعتبر است' })
  service: GuardEnum;
}

export class ValidateGuard {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  userId: string;

  @IsEnum(MethodEnum, { message: 'متود انتخابی نامعتبر است' })
  method: MethodEnum;

  @IsNotEmpty({ message: 'فیچر نمیتواند خالی باشد' })
  @IsString({ message: 'فیچر باید رشته باشد' })
  feature: string;

  @IsNotEmpty({ message: 'پرمیژن نمیتواند خالی باشد' })
  @IsString({ message: 'پرمیژن باید رشته باشد' })
  permission: string;

  @IsEnum(GuardEnum, { message: 'سرویس نامعتبر است' })
  service: GuardEnum;
}
