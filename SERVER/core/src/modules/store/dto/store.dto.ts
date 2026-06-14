import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StoreDto {
  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان فروشگاه باید رشته باشد' })
  @MinLength(5, { message: '' })
  @MaxLength(100, { message: '' })
  title: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  @MinLength(5, { message: '' })
  @MaxLength(100, { message: '' })
  alias: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  @MinLength(5, { message: '' })
  @MaxLength(255, { message: '' })
  description: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  @MinLength(5, { message: '' })
  @MaxLength(30, { message: '' })
  fullName: string;

  @IsNotEmpty({ message: '' })
  @IsUUID('4', { message: '' })
  logo: string;

  @IsNotEmpty({ message: '' })
  @IsUUID('4', { message: '' })
  banner: string;

  @IsNotEmpty({ message: '' })
  @IsArray({ message: '' })
  @IsUUID('4', { message: '', each: true })
  categories: string[];

  @IsNotEmpty({ message: '' })
  @IsArray({ message: '' })
  @IsUUID('4', { message: '', each: true })
  products: string[];
}
