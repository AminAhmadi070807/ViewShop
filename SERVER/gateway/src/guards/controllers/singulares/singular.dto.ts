import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SingularDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '',
    minLength: 36,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'ایدی پرمیژن نمیتواند خالی باشد' })
  @IsUUID()
  permissionId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '',
    minLength: 36,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'ایدی پرمیژن نمیتواند خالی باشد' })
  @IsUUID()
  roleId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '',
    minLength: 2,
    maxLength: 24,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(2, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;
}
