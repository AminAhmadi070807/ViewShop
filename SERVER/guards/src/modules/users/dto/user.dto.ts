import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}

export class UpdateUserDto {
  @IsNotEmpty({ message: 'ایدی کاربر نقش نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی کاربر باید یک یویوایدی معتتبر باشد' })
  @IsUUID()
  userId: string;

  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی نقش باید یک یویوایدی معتتبر باشد' })
  @IsUUID()
  roleId: string;
}
