import { IsEmail } from 'class-validator';

export class NewsletterDto {
  @IsEmail({}, { message: 'ایمیل نامعتبر است' })
  email: string;
}
