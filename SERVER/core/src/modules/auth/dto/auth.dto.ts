import {
  IsJWT,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
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
}

export class AuthValidateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  secret: string;
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
}
