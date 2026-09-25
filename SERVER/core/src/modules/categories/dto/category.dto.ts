import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsUUID('4', { message: 'شناسه ایکون نامعتبر است' })
  icon: string;
}

export class UpdateCategoryDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتر است' })
  id: string;

  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @IsUUID('4', { message: 'شناسه ایکون نامعتبر است' })
  icon: string;
}
