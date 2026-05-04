import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'please enter a valid phone number' })
  @IsString({ message: 'please enter a valid phone number' })
  @IsPhoneNumber('IR', { message: 'please enter a valid phone number' })
  phone: string;

  @IsNotEmpty({ message: 'password is not empty' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'minLength must be at least 8 characters' })
  @MaxLength(24, { message: 'maxLength must be at least 24 characters' })
  password: string;

  @IsNotEmpty({ message: 'fullName is not empty' })
  @IsString({ message: 'fullName has a string' })
  @MinLength(8, { message: 'minLength must be at least 8 characters' })
  @MaxLength(50, { message: 'maxLength must be at least 50 characters' })
  fullName: string;

  @IsNotEmpty({ message: 'please enter a valid email' })
  @IsString({ message: 'please enter a valid email' })
  @IsEmail({}, { message: 'please enter a valid phone number' })
  email: string;
}
