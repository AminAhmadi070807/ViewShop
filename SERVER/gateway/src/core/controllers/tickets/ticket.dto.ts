import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TicketsDepartmentEnum } from '../../../common/enums/core/tickets/tickets.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TicketDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: TicketsDepartmentEnum.SUPPORT,
    enum: TicketsDepartmentEnum,
  })
  @IsNotEmpty({ message: 'دپارتمن نمیتواند خالی باشد' })
  @IsString({ message: 'دپارتمن باید رشته باشد' })
  @IsEnum(TicketsDepartmentEnum, { message: 'مقدار دپارتمن نادرست است' })
  department: TicketsDepartmentEnum;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(8, { message: 'عنواند حدقل باید 8 کارکتر باشد' })
  @MaxLength(50, { message: 'عنواند حدکثر میتواند 50 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'توضیحات حدقل باید 8 کارکتر باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  description: string;
}

export class UpdateTicketDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه تیکت نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه تیکت نامعتبر هست' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'توضیحات حدقل باید 8 کارکتر باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  description: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه مدیا نمیتواند خالی باشد هست' })
  @IsUUID('4', { message: 'شناسه مدیا نامعتبر هست' })
  @IsOptional({ message: 'شناسه مدیا اختیاری هست' })
  media: string;
}
