import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GuardDto {
  @IsNotEmpty({ message: 'مسیر نمیتواند خالی باشد' })
  @IsString()
  patch: string;

  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsUUID()
  roleId: string;

  @IsBoolean({ message: 'لطفا عمومی بودن مسیر را با true, false مشخص کنید' })
  public: boolean;
}

export class UpdateGuardDto {}
