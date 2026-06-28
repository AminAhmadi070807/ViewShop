import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'جستجو نمیتواند خالی باشد' })
  @IsString({ message: 'جستجو باید رشته باشد' })
  title: string;
}
