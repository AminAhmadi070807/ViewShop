import {
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ColorDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'کد رنگ نمیتواند خالی باشد' })
  @IsHexColor({ message: 'کد رنگ نامعتبر است' })
  color: string;

  @IsUUID('4', { message: 'شناسه تصویر نامعتبر است' })
  @IsOptional({ message: 'شناسه تصویر اختیاری است' })
  media?: string;
}
