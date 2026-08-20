import { IsOptional, IsPhoneNumber, IsUUID } from 'class-validator';

export class Validate {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @IsOptional({ message: 'شناسه کاربر اختیاری است' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user?: string;

  @IsOptional({ message: 'شناسه نقش کاربر اختیاری است' })
  @IsUUID('4', { message: 'شناسه نقش کابر نامعتبر است' })
  role?: string;
}
