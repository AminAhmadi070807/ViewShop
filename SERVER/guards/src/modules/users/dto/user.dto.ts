import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;

  @IsNotEmpty({ message: 'نقش نمیتواند خالی باشد' })
  @IsString({ message: 'نقش کاربر باید رشته باشد' })
  role: string;
}

export class UpdateUserDto {
  @IsNotEmpty({ message: 'ایدی کاربر نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;

  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  roleId: string;
}
