import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه محصول نامعتبر هست' })
  product: string;
}
