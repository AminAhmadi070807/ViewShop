import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'user uuid',
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی کاربر نقش نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی کاربر باید یک یویوایدی معتتبر باشد' })
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: String,
    description: 'role uuid',
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی نقش نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی نقش باید یک یویوایدی معتتبر باشد' })
  @IsUUID()
  roleId: string;
}
