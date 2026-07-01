import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class WishlistDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MaxLength(50, { message: 'عنوان نمیتواند بیشتر از 50 کارکتر داشته باشد' })
  title: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;
}
