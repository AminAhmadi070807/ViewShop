import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RoleDto {
  @IsNotEmpty({ message: 'ایدی پرمیژن نباید خالی باشد' })
  @IsString({ message: 'ایدی پرمیژن باید یک uuid معتبر باشد' })
  @IsUUID()
  id: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;
}
