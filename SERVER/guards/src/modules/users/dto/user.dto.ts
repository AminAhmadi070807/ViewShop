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
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
