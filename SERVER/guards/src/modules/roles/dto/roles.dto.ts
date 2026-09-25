import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class RolesDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(3, { message: 'توضیحات حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 24 کارکتر داشته باشد' })
  description: string;
}

export class UpdateRolesDto extends PartialType(RolesDto) {
  @IsNotEmpty({ message: 'شناسه نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نقش نامعتبر است' })
  id: string;
}
