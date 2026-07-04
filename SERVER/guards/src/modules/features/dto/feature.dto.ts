import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FeatureDto {
  @IsNotEmpty({ message: 'شناسه نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نقش نامعتبر است' })
  roleId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}

export class UpdateFeatureDto {
  @IsNotEmpty({ message: 'شناسه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}
