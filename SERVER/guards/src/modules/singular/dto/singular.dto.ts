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

  @ArrayNotEmpty({ message: 'شناسه های پرمیژن نمیتواند خالی باشد' })
  @IsArray({ message: 'شناسه پرمیژن باید ارایه باشد' })
  @IsUUID('4', { message: 'شناسه پرمیژن نامعتبر است', each: true })
  permissions: string[];
}

export class SingularDto {
  @IsNotEmpty({ message: 'ایدی سینگیولار نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  feature: string;

  @ArrayNotEmpty({ message: 'ارایه دیتا نمیتواند خالی باشد' })
  @IsArray({ message: 'ارایه دیتا نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => RolePermissionDto)
  data: RolePermissionDto[];
}

export class UpdateSingularDto {
  @IsNotEmpty({ message: 'شناسه نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نقش نامعتبر است' })
  role: string;

  @IsNotEmpty({ message: 'ایدی پرمیژن نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  permission: string;

  @IsNotEmpty({ message: 'ایدی سینگیولار نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;
}
