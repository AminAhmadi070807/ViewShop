import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from '../../../common/enums/users/user.enum';

export class CreateUserDto {
  @IsOptional()
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id?: string;

  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'نقش کاربر نامعتبر است' })
  role?: UserRoleEnum;

  @IsPhoneNumber('IR', { message: 'شماره تلفن نامعتبر است' })
  phone: string;

  @IsString({ message: 'رمز عبور نامعتبر است' })
  @MinLength(8, { message: 'رمز عبور حدقل 8 کارکتر باید داشته باشد' })
  @MaxLength(24, { message: 'رمز عبور حدکثر میتواند 24 کارکتر داشته باشد' })
  password: string;

  @IsString({ message: 'نام و نام خانوادگی نامعتبر است' })
  @MinLength(8, { message: 'نام و نام خانوادگی حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(50, {
    message: 'نام و نام خانوادگی حدکثر میتواند 50 کارکتر داشته باشد',
  })
  fullName: string;
}
