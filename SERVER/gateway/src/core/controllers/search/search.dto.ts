import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SearchDto {
  @IsNotEmpty({ message: 'جستجو نمیتواند خالی باشد' })
  @IsString({ message: 'جستجو باید رشته باشد' })
  @MinLength(3, { message: 'جستجو حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'جستجو نمیتواند بیشتر از 255 کارکتر داشته باشد' })
  search: string;
}
