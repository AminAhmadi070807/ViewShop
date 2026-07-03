import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

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
