import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

export class MediaDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    enum: MediaTypeEnum,
    nullable: false,
    required: true,
    example: MediaTypeEnum.PUBLIC,
  })
  @IsBoolean({ message: 'پابلیک نامعتبر است' })
  type: boolean;
}
