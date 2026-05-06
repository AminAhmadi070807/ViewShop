import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  userAgent: string;
}

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string;

  @IsNotEmpty()
  @IsString()
  userAgent: string;
}
