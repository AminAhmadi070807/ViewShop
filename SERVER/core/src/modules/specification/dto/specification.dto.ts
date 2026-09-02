import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Details {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  description: string;
}

class SpecificationDetailsDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ArrayNotEmpty({ message: 'دیتا های ارسالی نمیتواند خالی باشد' })
  @IsArray({ message: 'دیتا های ارسالی نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => Details)
  details: Details[];
}

export class SpecificationDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ArrayNotEmpty({ message: 'دیتا های ارسالی نمیتواند خالی باشد' })
  @IsArray({ message: 'دیتا های ارسالی نامعتبر است' })
  @ValidateNested({ each: true })
  @Type(() => SpecificationDetailsDto)
  details: SpecificationDetailsDto[];
}
