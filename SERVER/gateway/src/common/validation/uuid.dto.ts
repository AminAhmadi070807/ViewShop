import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateUUID {
  @ApiProperty({
    description: 'UUID',
    example: '',
    type: 'string',
    nullable: false,
  })
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی باید رشته باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;
}

export class ValidateHeaderUUID {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی باید رشته باشد' })
  @IsUUID('4', { message: 'لطفا یک ایدی معتبر وارد کنید' })
  id: string;
}
