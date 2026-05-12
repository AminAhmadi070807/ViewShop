import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SingularDto {
  @IsNotEmpty({ message: 'ایدی پرمیژن نمیتواند خالی باشد' })
  @IsUUID()
  permissionId: string;

  @IsNotEmpty({ message: 'ایدی پرمیژن نمیتواند خالی باشد' })
  @IsUUID()
  roleId: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;
}
