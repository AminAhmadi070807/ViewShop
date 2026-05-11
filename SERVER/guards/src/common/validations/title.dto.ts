import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ValidateTitle {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3)
  @MaxLength(24)
  title: string;
}
