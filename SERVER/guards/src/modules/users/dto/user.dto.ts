import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;
}

export class UpdateUserDto {
  @IsNotEmpty({ message: 'ایدی کاربر نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  userId: string;
}
