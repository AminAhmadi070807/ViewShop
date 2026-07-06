import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 3,
    maxLength: 24,
    example: '',
  })
  @Matches(/[a-zA-Z]{3,24}/, { message: 'لطفا از کلمات انگلیسی استفاده کنید' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 3,
    maxLength: 255,
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(3, { message: 'توضیحات حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 24 کارکتر داشته باشد' })
  description: string;
}

export class UpdateRoleDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @ApiProperty({
    type: 'string',
    description: 'ایدی پرمیژن',
    example: '',
    nullable: false,
    minLength: 36,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'ایدی سینگیولار نباید خالی باشد' })
  @IsString({ message: 'ایدی سینگیولار باید یک uuid معتبر باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 3,
    maxLength: 24,
    example: '',
  })
  @Matches(/[a-zA-Z]{3,24}/, { message: 'لطفا از کلمات انگلیسی استفاده کنید' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 3,
    maxLength: 255,
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(3, { message: 'توضیحات حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 24 کارکتر داشته باشد' })
  description: string;
}
