import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class PhoneDto {
  @IsNotEmpty({ message: 'please enter a valid phone number' })
  @IsString({ message: 'please enter a valid phone number' })
  @IsPhoneNumber('IR', { message: 'please enter a valid phone number' })
  phone: string;
}
