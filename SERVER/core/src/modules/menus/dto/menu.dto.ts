import { MenuSectionEnum } from '../../../common/enums/sections/section.enum';
import { IsEnum, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class MenuDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نام متسعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @IsNotEmpty({ message: 'بخش نمیتواند خالی باشد' })
  @IsEnum(MenuSectionEnum, { message: 'بخش نامعتبر است' })
  section: MenuSectionEnum;
}

export class UpdateMenuDto extends PartialType(MenuDto) {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;
}
