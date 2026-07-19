import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewsletterDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsEmail({}, { message: 'ایمیل نامعتبر است' })
  email: string;
}
