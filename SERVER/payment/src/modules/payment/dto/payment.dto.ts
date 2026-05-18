import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ZarinPalDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(54)
  description: string;
}
