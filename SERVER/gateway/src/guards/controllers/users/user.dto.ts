import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی کاربر نقش نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی کاربر باید یک یویوایدی معتتبر باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  user: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی نقش باید یک یویوایدی معتتبر باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  role: string;
}
