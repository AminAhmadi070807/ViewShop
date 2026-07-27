import { MenuSectionEnum } from '../../../common/enums/sections/section.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class MenuDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'بخش نمیتواند خالی باشد' })
  @IsEnum(MenuSectionEnum, { message: 'بخش نامعتبر است' })
  section: MenuSectionEnum;
}
