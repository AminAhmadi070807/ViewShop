import {
  IsBoolean,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Information {
  @IsNotEmpty({ message: 'عنوان کامل فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان کامل باید رشته باشد' })
  full_title: string;

  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات فرشگاه باید رشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'ساعت پشتیبانی نمیتواند خالی باشد' })
  @IsString({ message: 'ساعت پشتیبانی باید رشته باشد' })
  service_hours: string;

  @IsNotEmpty({ message: 'شماره تماس نمیتواند خالی باشد' })
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @IsNotEmpty({ message: 'ایمیل نمیتواند خالی باشد' })
  @IsEmail({}, { message: 'ایمیل نامعتبر است' })
  email: string;
}

class Journal {
  @IsNotEmpty({ message: 'عنوان مجله نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان مجله باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات مجله باید رشته باشد' })
  description: string;
}

class Location {
  @IsLatitude({ message: 'عرض جرغرافیای نامعتبر است' })
  Latitude: string;

  @IsLongitude({ message: 'طول جغرافیایی نامعتبر است' })
  Longitude: string;
}

class Address {
  @IsNotEmpty({ message: 'ادرس کامل نمیتواند خالی باشد' })
  @IsString({ message: 'ادرس کامل باید رشته باشد' })
  full_address: string;

  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  @IsString({ message: 'استان باید رشته باشد' })
  province: string;

  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  @IsString({ message: 'شهر باید رشته باشد' })
  city: string;

  @IsNotEmpty({ message: 'کد پستی نمیتواند خالی باشد' })
  @IsString({ message: 'کد پستی باید رشته باشد' })
  @Matches(/^[0-9A-Za-z\s-]{3,10}$/, {
    message: 'کد پستی نامعتبر است',
  })
  zip_code: string;

  @IsNotEmpty({ message: 'لوکیشن نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Location)
  location: Location;
}

class Scripts {
  @IsUrl({}, { message: 'لینک اینماد نمیتواند خالی باشد' })
  enamad: string;

  @IsUrl({}, { message: 'لینک ساماندهی نمیتواند خالی باشد' })
  organization: string;

  @IsUrl({}, { message: 'لینک اتحادیه نمیتواند خالی باشد' })
  union: string;
}

class SocialMedia {
  @IsOptional({ message: 'شناسه انستاگرام اختیاری است' })
  @IsNotEmpty({ message: 'شناسه انستاگرام نمیتواند خالی باشد' })
  instagram?: string;

  @IsOptional({ message: 'شناسه تلگرام اختیاری است' })
  @IsNotEmpty({ message: 'شناسه تلگرام نمیتواند خالی باشد' })
  telegram?: string;

  @IsOptional({ message: 'شناسه تویتر اختیاری است' })
  @IsNotEmpty({ message: 'شناسه تویتر نمیتواند خالی باشد' })
  twitter?: string;

  @IsOptional({ message: 'شناسه فیسبوک اختیاری است' })
  @IsNotEmpty({ message: 'شناسه فیسبوک نمیتواند خالی باشد' })
  facebook?: string;

  @IsOptional({ message: 'شناسه واتساپ اختیاری است' })
  @IsNotEmpty({ message: 'شناسه واتساپ نمیتواند خالی باشد' })
  whatsApp?: string;

  @IsOptional({ message: 'شناسه ایتا اختیاری است' })
  @IsNotEmpty({ message: 'شناسه ایتا نمیتواند خالی باشد' })
  eitaa?: string;

  @IsOptional({ message: 'شناسه روبیکا اختیاری است' })
  @IsNotEmpty({ message: 'شناسه روبیکا نمیتواند خالی باشد' })
  rubika?: string;
}

class Links {
  @IsUrl({}, { message: 'لینک مستقیم نمیتواند خالی باشد' })
  direct: string;

  @IsUrl({}, { message: 'لینک کافه بازار نمیتواند خالی باشد' })
  @IsOptional({ message: 'لینک کافه بازار اختیاری است' })
  bazaar?: string;

  @IsOptional({ message: 'لینک مایکت اختیاری است' })
  @IsUrl({}, { message: 'لینک مایکت نمیتواند خالی باشد' })
  myket?: string;

  @IsOptional({ message: 'لینک سیب اپ اختیاری است' })
  @IsUrl({}, { message: 'لینک سیب اپ نمیتواند خالی باشد' })
  sibApp?: string;
}

class Support {
  @IsNotEmpty({ message: 'وضیعت دکمه شناور پشتیبانی نمیتواند خالی باشد' })
  @IsBoolean({ message: 'وضیعت دکمه شناور پشتیبانی نامعتبر است' })
  status: boolean;

  @IsNotEmpty({ message: 'شماره تماس پشتیبانی نمیتواند خالی باشد' })
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @IsNotEmpty({ message: 'شناسه انستاگرام نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه انستاگرام اختیاری است' })
  instagram?: string;

  @IsNotEmpty({ message: 'شناسه واتساپ نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه واتساپ اختیاری است' })
  whatsApp?: string;

  @IsNotEmpty({ message: 'شناسه تلگرام نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه تلگرام اختیاری است' })
  telegram?: string;
}

class Repair {
  @IsNotEmpty({ message: 'وضیعت حالت تعمیر نمیتواند خالی باشد' })
  @IsBoolean({ message: 'وضیعت حالت تعمیر نامعتبر است' })
  status: boolean;

  @IsNotEmpty({ message: 'عنوان تعمیر نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان تعمیر باید رشته باشد' })
  title: string;
}

class Logo {
  @IsUUID('4', { message: 'شناسه لوگو نامعتبر است' })
  logo: string;

  @IsUUID('4', { message: 'شناسه favicon نامعتبر است' })
  favicon: string;

  @IsUUID('4', { message: 'شناسه واترمارک نامعتبر است' })
  watermark: string;

  @IsUUID('4', { message: 'شناسه لوگو حالت شب نامعتبر است' })
  night_model: string;
}

export class SettingDto {
  @IsNotEmpty({ message: 'اطلاعات فروشگاه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Information)
  information: Information;

  @IsNotEmpty({ message: 'مجله نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Journal)
  journal: Journal;

  @IsNotEmpty({ message: 'ادرس نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsNotEmpty({ message: 'اسکریپت نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Scripts)
  scripts: Scripts;

  @IsNotEmpty({ message: 'شبکه اجتماعی نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => SocialMedia)
  social_media: SocialMedia;

  @IsNotEmpty({ message: 'لینک برنامه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Links)
  links: Links;

  @IsNotEmpty({ message: 'پشتیبانی نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Support)
  support: Support;

  @IsNotEmpty({ message: 'حالت تعمیر نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Repair)
  repair: Repair;

  @IsNotEmpty({ message: 'لوگو نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => Logo)
  logo: Logo;
}
