import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RolePermissionDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نقش نامعتبر است' })
  role: string;

  @ApiProperty({
    type: [String],
    isArray: true,
    required: true,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'شناسه های پرمیژن نمیتواند خالی باشد' })
  @IsArray({ message: 'شناسه پرمیژن باید ارایه باشد' })
  @IsUUID('4', { message: 'شناسه پرمیژن نامعتبر است', each: true })
  permissions: string[];
}

export class SingularDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی سینگیولار نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  feature: string;

  @ApiProperty({
    type: () => RolePermissionDto,
    isArray: true,
    required: true,
    nullable: false,
    example: RolePermissionDto,
  })
  @ArrayNotEmpty({ message: 'ارایه دیتا نمیتواند خالی باشد' })
  @IsArray({ message: 'ارایه دیتا نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => RolePermissionDto)
  data: RolePermissionDto[];
}

export class UpdateSingularDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی پرمیژن نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  permissionId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی سینگیولار نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  singularId: string;
}
