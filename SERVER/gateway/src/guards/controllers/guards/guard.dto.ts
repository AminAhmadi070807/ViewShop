import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GuardDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    description: 'patch',
  })
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @Matches(/^api\/v\d\/(guards|core|admin|payment|seller)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    description: 'roleId',
  })
  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  roleId: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
    example: false,
    description: 'is public route',
  })
  @IsBoolean({ message: 'لطفا عمومی بودن مسیر را با true, false مشخص کنید' })
  public: boolean;
}

export class ValidateGuard {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    description: 'validate route',
  })
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString({ message: 'مسیر باید رشته باشد' })
  @Matches(/^api\/v\d\/(guards|core|admin|payment|seller)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;
}

export class UpdateGuardDto {}
