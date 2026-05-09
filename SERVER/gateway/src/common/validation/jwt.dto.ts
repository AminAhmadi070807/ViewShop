import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserRoleEnum } from '../enums/core/users/role.enum';

export class JwtPayload {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی باید رشته باشد' })
  @IsUUID()
  userId: string;

  @IsNotEmpty({ message: 'نقش کاربر نمیتواند خالی باشد' })
  @IsString({ message: 'نقش کاربر باید رشته باشد' })
  @IsEnum(UserRoleEnum, { message: 'لطفا نقش کاربر درست را وارد کنید' })
  role: UserRoleEnum;
}

export class JwtRefreshPayload {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی باید رشته باشد' })
  @IsUUID()
  userId: string;

  @IsNotEmpty({ message: 'نقش کاربر نمیتواند خالی باشد' })
  @IsString({ message: 'نقش کاربر باید رشته باشد' })
  @IsEnum(UserRoleEnum, { message: 'لطفا نقش کاربر درست را وارد کنید' })
  role: UserRoleEnum;

  @IsNotEmpty({ message: 'کلید نمیتواند خالی باشد' })
  @IsString({ message: 'کلید باید رشته باشد' })
  @IsUUID()
  secret: string;
}
