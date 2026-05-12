import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RoleDto {
  @IsNotEmpty({ message: 'ایدی سینگیولار نباید خالی باشد' })
  @IsString({ message: 'ایدی سینگیولار باید یک uuid معتبر باشد' })
  @IsUUID()
  singularId: string;

  @IsNotEmpty({ message: 'ایدی نقش نباید خالی باشد' })
  @IsString({ message: 'ایدی نقش باید یک uuid معتبر باشد' })
  @IsUUID()
  roleId: string;
}
