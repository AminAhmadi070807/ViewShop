import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ValidateUUID {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
