import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  GuardEnum,
  MethodEnum,
} from '../../../common/enums/guards/guards/guard.enum';

export class GuardDto {
  @ApiProperty({
    type: String,
    enum: MethodEnum,
    nullable: false,
    example: MethodEnum.GET,
  })
  @IsNotEmpty({ message: 'متود نمیتواند خالی باشد' })
  @IsEnum(MethodEnum)
  method: MethodEnum;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'شناسه فیچر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه فیچر نامعتبر است' })
  feature: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'شناسه پرمیژن نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه پرمیژن نامعتبر است' })
  permission: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
    example: false,
  })
  @IsBoolean({ message: 'حالت عمومی نامعتبر است' })
  public: boolean;

  @ApiProperty({
    type: String,
    enum: GuardEnum,
    nullable: false,
    example: GuardEnum.CORE,
  })
  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, { message: 'سرویس نامعتبر است' })
  service: GuardEnum;
}

export class ValidateGuard {
  @ApiProperty({
    type: String,
    enum: GuardEnum,
    nullable: false,
    example: GuardEnum.CORE,
  })
  @IsNotEmpty({ message: 'سوریس نمیتواند خالی باشد' })
  @IsEnum(GuardEnum, { message: 'سرویس نامعتبر است' })
  service: GuardEnum;
}
