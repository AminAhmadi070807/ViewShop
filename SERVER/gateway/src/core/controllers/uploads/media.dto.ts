import {
  Allow,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

export class MediaDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @Allow()
  media: any;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    enum: MediaTypeEnum,
    nullable: false,
    required: true,
    example: MediaTypeEnum.PUBLIC,
  })
  @IsEnum(MediaTypeEnum, { message: 'نوع مدیا نامعتبر است' })
  type: MediaTypeEnum;
}
