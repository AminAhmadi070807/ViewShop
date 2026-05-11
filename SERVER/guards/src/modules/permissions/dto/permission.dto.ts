import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PermissionEnum } from '../../../common/enums/permission/permission.enum';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(PermissionEnum)
  title: PermissionEnum;
}