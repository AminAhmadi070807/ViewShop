import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GuardEnum } from '../../../common/enums/guards/guards/guard.enum';
import any = jasmine.any;

export class GuardDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    description: 'patch',
  })
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @Matches(/^\/api\/v\d\/(guards|core|admin|payment|seller)(\/.*)$/, {
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

  @ApiProperty({
    type: String,
    enum: GuardEnum,
    nullable: false,
    example: GuardEnum.CORE,
  })
  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message:
      'سوریس باید یکی از این موارد باشد (CORE, GUARD, ADMIN, SELLER, PAYMENT)',
  })
  service: GuardEnum;

  @ApiProperty({
    type: String,
    example: '',
    description: 'pattern',
  })
  @IsNotEmpty({ message: 'پترن نمیتواند خالی باشد' })
  @IsString({ message: 'پترن باید رشته باشد' })
  pattern: string;
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
  @Matches(/^\/api\/v\d\/(guards|core|admin|payment|seller)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: GuardEnum.CORE,
    description: 'service name',
  })
  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, {
    message:
      'سوریس باید یکی از این موارد باشد (CORE, GUARD, ADMIN, SELLER, PAYMENT)',
  })
  service: GuardEnum;

  @ApiProperty({
    required: false,
    nullable: true,
    example: {},
    description: 'validate data',
  })
  @IsNotEmpty()
  @IsOptional()
  data?: unknown;
}
