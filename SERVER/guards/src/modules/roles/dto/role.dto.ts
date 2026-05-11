import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
