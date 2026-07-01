import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WishlistDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MaxLength(50, { message: 'عنوان نمیتواند بیشتر از 50 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;
}
