import { IsNotEmpty, IsUUID } from 'class-validator';

export class ValidateUUID {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID()
  id: string;
}
