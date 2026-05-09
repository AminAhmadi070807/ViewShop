import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class PhoneDto {
  @IsNotEmpty({ message: 'شماره تلفن نمیتواند خالی باشد' })
  @IsString({ message: 'لطفا یک شماره تلفن درست وارد کنید' })
  @IsPhoneNumber('IR', { message: 'لطفا یک شماره تلفن درست وارد کنید' })
  phone: string;
}
