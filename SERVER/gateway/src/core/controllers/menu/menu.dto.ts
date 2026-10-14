import { IsEnum, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MenuSectionEnum {
  HEADER = 'HEADER',
  HEADER_HORIZONTAL = 'HEADER_HORIZONTAL',
  FOOTER = 'FOOTER',
  FOOTER_HORIZONTAL = 'FOOTER_HORIZONTAL',
}

export class MenuDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'نام متسعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @ApiProperty({
    type: String,
    enum: MenuSectionEnum,
    required: true,
    nullable: false,
    example: MenuSectionEnum.HEADER,
  })
  @IsNotEmpty({ message: 'بخش نمیتواند خالی باشد' })
  @IsEnum(MenuSectionEnum, { message: 'بخش نامعتبر است' })
  section: MenuSectionEnum;
}

export class UpdateMenuDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'نام متسعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @ApiProperty({
    type: String,
    enum: MenuSectionEnum,
    required: true,
    nullable: false,
    example: MenuSectionEnum.HEADER,
  })
  @IsNotEmpty({ message: 'بخش نمیتواند خالی باشد' })
  @IsEnum(MenuSectionEnum, { message: 'بخش نامعتبر است' })
  section: MenuSectionEnum;
}
