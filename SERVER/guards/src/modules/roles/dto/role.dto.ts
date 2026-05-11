import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
