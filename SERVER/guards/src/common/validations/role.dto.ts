import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RoleDto {
  @IsNotEmpty({ message: 'ایدی پرمیژن نباید خالی باشد' })
  @IsString({ message: 'ایدی پرمیژن باید یک uuid معتبر باشد' })
  @IsUUID()
  @IsOptional()
  permissionId: string;

  @IsNotEmpty({ message: 'ایدی نقش نباید خالی باشد' })
  @IsString({ message: 'ایدی نقش باید یک uuid معتبر باشد' })
  @IsUUID()
  @IsOptional()
  roleId: string;
}
