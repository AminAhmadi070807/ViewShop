import { IsEnum, IsUUID } from 'class-validator';
import { UserRoleEnum } from '../enums/core/users/role.enum';

export class JwtPayload {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  userId: string;

  @IsEnum(UserRoleEnum, { message: 'نقش کاربر نامعتبر است' })
  role: UserRoleEnum;
}

export class JwtRefreshPayload {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  userId: string;

  @IsEnum(UserRoleEnum, { message: 'نقش کاربر نامعتبر است' })
  role: UserRoleEnum;

  @IsUUID('4', { message: 'شناسه امنیتی نامعتبر است' })
  secret: string;
}
