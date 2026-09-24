import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AttributeCategoryDto {
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_ ]{3,36})$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @IsUUID('4', { message: 'شناسه ایکون نامعتبر است' })
  icon: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  subCategory: string;
}
