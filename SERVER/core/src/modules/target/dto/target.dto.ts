import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class TargetDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'عنوان نمیتواند بیشتر از 50 کارکتر داشته باشد' })
  title: string;
}

export class UpdateTargetDto extends PartialType(TargetDto) {
  @IsUUID('4', { message: 'شناسه هدف نمیتواند خالی باشد' })
  id: string;
}
