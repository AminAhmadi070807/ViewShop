import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 8,
    maxLength: 60,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(60)
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 2,
    maxLength: 12,
    example: '',
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(12, { each: true })
  slug: [string];

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(255)
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty()
  @IsUUID()
  cover: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty()
  @IsUUID()
  store: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty()
  @IsUUID()
  category: string;
}
