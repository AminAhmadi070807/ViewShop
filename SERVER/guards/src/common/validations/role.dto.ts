import { IsNotEmpty, IsUUID } from 'class-validator';

export class RoleDto {
  @IsNotEmpty({ message: 'ایدی سینگیولار نباید خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  singularId: string;

  @IsNotEmpty({ message: 'ایدی نقش نباید خالی باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  roleId: string;
}
