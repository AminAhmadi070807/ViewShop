import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum MenuSectionEnum {
  HEADER = 'HEADER',
  HEADER_HORIZONTAL = 'HEADER_HORIZONTAL',
  FOOTER = 'FOOTER',
  FOOTER_HORIZONTAL = 'FOOTER_HORIZONTAL',
}

export class MenuDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نام متسعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  alias: string;

  @IsNotEmpty({ message: 'بخش نمیتواند خالی باشد' })
  @IsEnum(MenuSectionEnum, { message: 'بخش نامعتبر است' })
  section: MenuSectionEnum;
}
