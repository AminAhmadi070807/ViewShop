import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SmsDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  code: string;
}
