import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNotEmpty({ message: 'نام و نام خانوادگی نمیتواند خالی باشد' })
  @IsString({ message: 'نام و نام خانوادگی باید رشته باشد' })
  @MinLength(8, { message: 'نام و نام خانوادگی حدقل باید 8 کارکتر باشد' })
  @MaxLength(50, {
    message: 'نام و نام خانوادگی حدکثر میتواند 50 کارکتر داشته باشد',
  })
  fullName: string;
}
