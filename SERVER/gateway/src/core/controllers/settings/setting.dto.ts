import {
  IsBoolean,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Information {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'عنوان کامل فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان کامل باید رشته باشد' })
  full_title: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'توضیحان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات فرشگاه باید رشته باشد' })
  description: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'ساعت پشتیبانی نمیتواند خالی باشد' })
  @IsString({ message: 'ساعت پشتیبانی باید رشته باشد' })
  service_hours: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsPhoneNumber('IR', { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsEmail({}, { message: 'ایمیل نامعتبر است' })
  email: string;
}

class Journal {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'عنوان مجله نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان مجله باید رشته باشد' })
  title: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'توضیحان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات مجله باید رشته باشد' })
  description: string;
}

class Location {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsLatitude({ message: 'عرض جرغرافیای نامعتبر است' })
  Latitude: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsLongitude({ message: 'طول جغرافیایی نامعتبر است' })
  Longitude: string;
}

class Address {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'ادرس کامل نمیتواند خالی باشد' })
  @IsString({ message: 'ادرس کامل باید رشته باشد' })
  full_address: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  @IsString({ message: 'استان باید رشته باشد' })
  province: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  @IsString({ message: 'شهر باید رشته باشد' })
  city: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @Matches(/^[0-9A-Za-z\s-]{3,10}$/, {
    message: 'کد پستی نامعتبر است',
  })
  zip_code: string;

  @ApiProperty({
    type: () => Location,
    required: true,
    nullable: false,
    example: Location,
  })
  @IsNotEmpty({ message: 'لوکیشن نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Location)
  location: Location;
}

class Scripts {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUrl({}, { message: 'لینک اینماد نمیتواند خالی باشد' })
  enamad: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUrl({}, { message: 'لینک ساماندهی نمیتواند خالی باشد' })
  organization: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUrl({}, { message: 'لینک اتحادیه نمیتواند خالی باشد' })
  union: string;
}

class SocialMedia {
  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsOptional({ message: 'شناسه انستاگرام اختیاری است' })
  @IsNotEmpty({ message: 'شناسه انستاگرام نمیتواند خالی باشد' })
  instagram?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsOptional({ message: 'شناسه تلگرام اختیاری است' })
  @IsNotEmpty({ message: 'شناسه تلگرام نمیتواند خالی باشد' })
  telegram?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsOptional({ message: 'شناسه تویتر اختیاری است' })
  @IsNotEmpty({ message: 'شناسه تویتر نمیتواند خالی باشد' })
  twitter?: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsOptional({ message: 'شناسه فیسبوک اختیاری است' })
  @IsNotEmpty({ message: 'شناسه فیسبوک نمیتواند خالی باشد' })
  facebook?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه واتساپ نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه واتساپ اختیاری است' })
  whatsApp?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه ایتا نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه ایتا اختیاری است' })
  eitaa?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه روبیکا نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه روبیکا اختیاری است' })
  rubika?: string;
}

class Links {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUrl({}, { message: 'لینک مستقیم نمیتواند خالی باشد' })
  direct: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsOptional({ message: 'لینک کافه بازار اختیاری است' })
  @IsUrl({}, { message: 'لینک کافه بازار نمیتواند خالی باشد' })
  bazaar?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsOptional({ message: 'لینک مایکت اختیاری است' })
  @IsUrl({}, { message: 'لینک مایکت نمیتواند خالی باشد' })
  myket?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl({}, { message: 'لینک سیب اپ نمیتواند خالی باشد' })
  @IsOptional({ message: 'لینک سیب اپ اختیاری است' })
  sibApp?: string;
}

class Support {
  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
    example: '',
  })
  @IsBoolean({ message: 'وضیعت دکمه شناور پشتیبانی نامعتبر است' })
  status: boolean;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsPhoneNumber('IR', { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsOptional({ message: 'شناسه انستاگرام اختیاری است' })
  @IsNotEmpty({ message: 'شناسه انستاگرام نمیتواند خالی باشد' })
  instagram?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsOptional({ message: 'شناسه واتساپ اختیاری است' })
  @IsNotEmpty({ message: 'شناسه واتساپ نمیتواند خالی باشد' })
  whatsApp?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه تلگرام نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه تلگرام اختیاری است' })
  telegram?: string;
}

class Repair {
  @ApiProperty({ type: Boolean, required: true, example: false })
  @IsBoolean({ message: 'وضیعت حالت تعمیر نامعتبر است' })
  status: boolean;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'عنوان تعمیر نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان تعمیر باید رشته باشد' })
  title: string;
}

class Logo {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه لوگو نامعتبر است' })
  logo: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه favicon نامعتبر است' })
  favicon: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه واترمارک نامعتبر است' })
  watermark: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه لوگو حالت شب نامعتبر است' })
  night_model: string;
}

export class Setting {
  @ApiProperty({
    type: () => Information,
    required: true,
    nullable: false,
    example: Information,
  })
  @IsNotEmpty({ message: 'اطلاعات فروشگاه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Information)
  information: Information;

  @ApiProperty({
    type: () => Journal,
    required: true,
    nullable: false,
    example: Journal,
  })
  @IsNotEmpty({ message: 'مجله نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Journal)
  journal: Journal;

  @ApiProperty({
    type: () => Address,
    required: true,
    nullable: false,
    example: Address,
  })
  @IsNotEmpty({ message: 'ادرس نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ApiProperty({
    type: () => Scripts,
    required: true,
    nullable: false,
    example: Scripts,
  })
  @IsNotEmpty({ message: 'اسکریپت نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Scripts)
  scripts: Scripts;

  @ApiProperty({
    type: () => SocialMedia,
    required: true,
    nullable: false,
    example: SocialMedia,
  })
  @IsNotEmpty({ message: 'شبکه اجتماعی نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => SocialMedia)
  social_media: SocialMedia;

  @ApiProperty({
    type: () => Links,
    required: true,
    nullable: false,
    example: Links,
  })
  @IsNotEmpty({ message: 'لینک برنامه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Links)
  link: Links;

  @ApiProperty({
    type: () => Support,
    required: true,
    nullable: false,
    example: Support,
  })
  @IsNotEmpty({ message: 'پشتیبانی نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Support)
  support: Support;

  @ApiProperty({
    type: () => Repair,
    required: true,
    nullable: false,
    example: Repair,
  })
  @IsNotEmpty({ message: 'حالت تعمیر نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Repair)
  repair: Repair;

  @ApiProperty({
    type: () => Logo,
    required: true,
    nullable: false,
    example: Logo,
  })
  @IsNotEmpty({ message: 'لوگو نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Logo)
  logo: Logo;
}
