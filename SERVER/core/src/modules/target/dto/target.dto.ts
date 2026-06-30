import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TargetDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'عنوان نمیتواند بیشتر از 50 کارکتر داشته باشد' })
  title: string;
}
