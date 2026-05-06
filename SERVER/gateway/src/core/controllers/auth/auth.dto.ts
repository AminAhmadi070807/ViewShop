import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  @ApiProperty({
    description: 'User phone number',
    example: '09144676519',
    type: 'string',
    required: true,
    maxLength: 11,
    minLength: 11,
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: '123456789',
    type: 'string',
    required: true,
    maxLength: 24,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string;

  @ApiProperty({
    description: 'User fullName',
    example: 'Amin Ahmadi',
    type: 'string',
    required: true,
    maxLength: 50,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  fullName: string;
}

export class AuthLoginDto {
  @ApiProperty({
    description: 'User phone number',
    example: '09144676519',
    type: 'string',
    required: true,
    maxLength: 11,
    minLength: 11,
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: '123456789',
    type: 'string',
    required: true,
    maxLength: 24,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string;
}
