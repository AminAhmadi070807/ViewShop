import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTypeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;
}

export class UpdateFilterTypeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه فیلتر تایپ نمیتواند خالی باشد' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;
}
