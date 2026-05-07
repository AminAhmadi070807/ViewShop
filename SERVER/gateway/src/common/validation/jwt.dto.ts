import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserRoleEnum } from '../enums/core/users/role.enum';

export class JwtPayload {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}

export class JwtRefreshPayload {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  secret: string;
}
