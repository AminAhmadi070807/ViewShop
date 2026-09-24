import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AttributeCategoryDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه ایکون نامعتبر است' })
  icon: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  subCategory: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_ ]{3,36})$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 3,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;
}
