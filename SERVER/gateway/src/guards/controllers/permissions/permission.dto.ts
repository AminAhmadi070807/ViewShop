import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
    pattern: /^[a-zA-Z0-9]{3,50}$/,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @Matches(/^[a-zA-Z0-9]{3,50}$/, { message: 'عنوان باید انگلیسی باشد' })
  title: string;
}
