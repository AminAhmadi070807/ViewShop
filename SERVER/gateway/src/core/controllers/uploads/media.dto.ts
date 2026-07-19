import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MediaDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 3,
    maxLength: 24,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    required: true,
    example: true,
  })
  @IsBoolean({ message: 'پابلیک نامعتبر است' })
  public: boolean;
}
