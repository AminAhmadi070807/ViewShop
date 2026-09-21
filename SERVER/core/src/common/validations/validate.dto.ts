import { IsOptional, IsString, IsUUID } from 'class-validator';

export class Validate {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @IsOptional({ message: 'شناسه کاربر اختیاری است' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user?: string;

  @IsOptional({ message: 'نقش کاربر اختیاری است' })
  @IsString({ message: 'نقش کابر نامعتبر است' })
  role?: string;
}
