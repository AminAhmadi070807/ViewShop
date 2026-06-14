import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StoreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  alias: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  fullName: string;

  @IsNotEmpty()
  @IsUUID()
  logo: string;

  @IsNotEmpty()
  @IsUUID()
  banner: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID()
  categories: string[];

  @IsNotEmpty()
  @IsArray()
  @IsUUID()
  products: string[];
}
