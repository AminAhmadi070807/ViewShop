import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeatureDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه نقش نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نقش نامعتبر است' })
  roleId: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}

export class UpdateFeatureDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}
