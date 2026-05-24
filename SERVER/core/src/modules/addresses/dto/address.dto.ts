import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  province: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  street: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  alley: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  address: string;

  @IsNotEmpty()
  @Type((): NumberConstructor => Number)
  @MinLength(10)
  @MaxLength(10)
  postal_code: number;
}
