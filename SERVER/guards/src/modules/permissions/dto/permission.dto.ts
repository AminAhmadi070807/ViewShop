import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { PermissionEnum } from '../../../common/enums/permission/permission.enum';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(PermissionEnum)
  title: PermissionEnum;
}

export class UpdatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(PermissionEnum)
  title: PermissionEnum;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
