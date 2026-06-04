import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  GuardEnum,
  MethodEnum,
} from '../../../common/enums/guards/guards/guard.enum';
import { HttpStatus } from '@nestjs/common';
import { statusMessages } from '../../../common/messages/status.message';

export class GuardDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    description: 'patch',
  })
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @Matches(/^\/api\/v\d\/(guards|core|payment)(\/.*)$/, {
    message: 'لطفا یک مسیر درست وارد کنید',
  })
  patch: string;

  @ApiProperty({
    type: String,
    enum: MethodEnum,
    nullable: false,
    example: MethodEnum.GET,
  })
  @IsNotEmpty({ message: 'متود نمیتواند خالی باشد' })
  @IsEnum(MethodEnum)
  method: GuardEnum;

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
      'سوریس باید یکی از این موارد باشد (CORE, GUARDS, GATEWAY, PAYMENT)',
  })
  service: GuardEnum;
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
  @Matches(/^\/api\/v\d\/(guards|core|payment)(\/.*)$/, {
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
    message: 'سوریس باید یکی از این موارد باشد (CORE, GUARD, PAYMENT)',
  })
  service: GuardEnum;
}

export class ValidateOkResult {
  @ApiProperty({
    type: Number,
    enum: HttpStatus,
    example: HttpStatus.OK,
  })
  @IsNotEmpty()
  @IsEnum(HttpStatus)
  status: HttpStatus;

  @ApiProperty({
    type: String,
    example: statusMessages.fa['200'],
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  body: boolean;
}
