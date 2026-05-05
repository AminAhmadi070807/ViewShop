import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserValidator {
  @ApiProperty({
    type: 'string',
    example: '0999000000',
    description: 'phone number is required',
    pattern: /^09(0[1-5]|1\d|2[0-2]|3\d|9[^567])\d{7}$/,
  })
  @IsNotEmpty({ message: 'please enter a valid phone number' })
  @IsString({ message: 'please enter a valid phone number' })
  @IsPhoneNumber('IR', { message: 'please enter a valid phone number' })
  phone: string;

  @ApiProperty({
    type: 'string',
    minLength: 8,
    maxLength: 24,
    description: 'user password is required',
    example: '123456789',
  })
  @IsNotEmpty({ message: 'password is not empty' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'minLength must be at least 8 characters' })
  @MaxLength(24, { message: 'maxLength must be at least 24 characters' })
  password: string;

  @ApiPropertyOptional({
    type: 'string',
    minLength: 8,
    maxLength: 50,
    description: 'fullName is optional',
    example: 'Amin Ahmadi',
  })
  @IsNotEmpty({ message: 'fullName is not empty' })
  @IsString({ message: 'fullName has a string' })
  @MinLength(8, { message: 'minLength must be at least 8 characters' })
  @MaxLength(50, { message: 'maxLength must be at least 50 characters' })
  fullName: string;
}

export class UserUpdateValidator {
  @ApiPropertyOptional({
    type: 'string',
    minLength: 8,
    maxLength: 50,
    description: 'fullName is optional',
    example: 'Amin Ahmadi',
  })
  @IsNotEmpty({ message: 'fullName is not empty' })
  @IsString({ message: 'fullName has a string' })
  @MinLength(8, { message: 'minLength must be at least 8 characters' })
  @MaxLength(50, { message: 'maxLength must be at least 50 characters' })
  fullName: string;
}
