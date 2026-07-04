import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RolePermissionDto {
  @IsNotEmpty({ message: 'شناسه نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نقش نامعتبر است' })
  role: string;

  @IsNotEmpty({ message: 'شناسه پرمیژن نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه پرمیژن نامعتبر است' })
  permissions: string;
}

export class UpdateSingularDto {
  @IsNotEmpty({ message: 'ایدی پرمیژن نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  permissionId: string;

  @IsNotEmpty({ message: 'ایدی سینگیولار نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  singularId: string;

  @ArrayNotEmpty({ message: 'ارایه دیتا نمیتواند خالی باشد' })
  @IsArray({ message: 'ارایه دیتا نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => RolePermissionDto)
  data: RolePermissionDto[];
}
