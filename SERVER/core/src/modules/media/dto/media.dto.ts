import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MediaDto {
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'مسیر نباید خالی باشد' })
  @IsString({ message: 'مسیر باید رشته باشد' })
  path: string;

  @IsBoolean({ message: 'پابلیک نامعتبر است' })
  public: boolean;

  @IsNotEmpty({ message: 'ایدی کاربر نباید خالی باشد' })
  @IsUUID('4', { message: 'ایدی نادرست است' })
  user: string;
}
