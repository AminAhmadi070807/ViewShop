import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RolesDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(3, { message: 'توضیحات حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 24 کارکتر داشته باشد' })
  description: string;
}
