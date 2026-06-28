import { IsNotEmpty, IsUUID } from 'class-validator';

export class LikeDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsNotEmpty({ message: 'شناسه محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;
}
