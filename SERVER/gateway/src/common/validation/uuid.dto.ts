import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ValidateUUID {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی باید رشته باشد' })
  @IsUUID()
  id: string;
}
