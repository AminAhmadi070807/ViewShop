import { IsOptional, IsUUID } from 'class-validator';

export class Validate {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  @IsOptional({ message: 'شناسه کاربر اختیاری است' })
  user?: string;

  @IsUUID('4', { message: 'شناسه نقش کابر نامعتبر است' })
  @IsOptional({ message: 'شناسه نقش کاربر اختیاری است' })
  role?: string;
}
