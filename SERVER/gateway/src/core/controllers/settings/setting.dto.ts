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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class InformationDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان کامل فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان کامل باید رشته باشد' })
  full_title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات فرشگاه باید رشته باشد' })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ساعت پشتیبانی نمیتواند خالی باشد' })
  @IsString({ message: 'ساعت پشتیبانی باید رشته باشد' })
  service_hours: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شماره تماس نمیتواند خالی باشد' })
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایمیل نمیتواند خالی باشد' })
  @IsEmail({}, { message: 'ایمیل نامعتبر است' })
  email: string;
}

class JournalDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان مجله نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان مجله باید رشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات مجله باید رشته باشد' })
  description: string;
}

class LocationDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsLatitude({ message: 'عرض جرغرافیای نامعتبر است' })
  Latitude: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsLongitude({ message: 'طول جغرافیایی نامعتبر است' })
  Longitude: string;
}

class AddressDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ادرس کامل نمیتواند خالی باشد' })
  @IsString({ message: 'ادرس کامل باید رشته باشد' })
  full_address: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  @IsString({ message: 'استان باید رشته باشد' })
  province: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  @IsString({ message: 'شهر باید رشته باشد' })
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'کد پستی نمیتواند خالی باشد' })
  @IsString({ message: 'کد پستی باید رشته باشد' })
  @Matches(/^[0-9A-Za-z\s-]{3,10}$/, {
    message: 'کد پستی نامعتبر است',
  })
  zip_code: string;

  @ApiProperty({
    type: () => LocationDto,
    required: true,
    nullable: false,
    example: LocationDto,
  })
  @IsNotEmpty({ message: 'لوکیشن نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}

class ScriptsDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'لینک اینماد نمیتواند خالی باشد' },
  )
  enamad: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'لینک ساماندهی نمیتواند خالی باشد' },
  )
  organization: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'لینک اتحادیه نمیتواند خالی باشد' },
  )
  union: string;
}

class SocialMediaDto {
  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه انستاگرام نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه انستاگرام اختیاری است' })
  instagram?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه تلگرام نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه تلگرام اختیاری است' })
  telegram?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه تویتر نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه تویتر اختیاری است' })
  twitter?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه فیسبوک نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه فیسبوک اختیاری است' })
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

class LinksDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'لینک مستقیم نمیتواند خالی باشد' },
  )
  direct: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'لینک کافه بازار نمیتواند خالی باشد' },
  )
  @IsOptional({ message: 'لینک کافه بازار اختیاری است' })
  bazaar?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'لینک مایکت نمیتواند خالی باشد' },
  )
  @IsOptional({ message: 'لینک مایکت اختیاری است' })
  myket?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'لینک سیب اپ نمیتواند خالی باشد' },
  )
  @IsOptional({ message: 'لینک سیب اپ اختیاری است' })
  sibApp?: string;
}

class SupportDto {
  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'وضیعت دکمه شناور پشتیبانی نمیتواند خالی باشد' })
  @IsBoolean({ message: 'وضیعت دکمه شناور پشتیبانی نامعتبر است' })
  status: boolean;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شماره تماس پشتیبانی نمیتواند خالی باشد' })
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه انستاگرام نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه انستاگرام اختیاری است' })
  instagram?: string;

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
  @IsNotEmpty({ message: 'شناسه تلگرام نمیتواند خالی باشد' })
  @IsOptional({ message: 'شناسه تلگرام اختیاری است' })
  telegram?: string;
}

class RepairDto {
  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'وضیعت حالت تعمیر نمیتواند خالی باشد' })
  @IsBoolean({ message: 'وضیعت حالت تعمیر نامعتبر است' })
  status: boolean;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان تعمیر نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان تعمیر باید رشته باشد' })
  title: string;
}

class LogoDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه لوگو نامعتبر است' })
  logo: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه favicon نامعتبر است' })
  favicon: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه واترمارک نامعتبر است' })
  watermark: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه لوگو حالت شب نامعتبر است' })
  night_model: string;
}

export class SettingDto {
  @ApiProperty({
    type: () => InformationDto,
    required: true,
    nullable: false,
    example: InformationDto,
  })
  @IsNotEmpty({ message: 'اطلاعات فروشگاه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => InformationDto)
  information: InformationDto;

  @ApiProperty({
    type: () => JournalDto,
    required: true,
    nullable: false,
    example: JournalDto,
  })
  @IsNotEmpty({ message: 'مجله نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => JournalDto)
  journalDto: JournalDto;

  @ApiProperty({
    type: () => AddressDto,
    required: true,
    nullable: false,
    example: AddressDto,
  })
  @IsNotEmpty({ message: 'ادرس نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => AddressDto)
  addressDto: AddressDto;

  @ApiProperty({
    type: () => ScriptsDto,
    required: true,
    nullable: false,
    example: ScriptsDto,
  })
  @IsNotEmpty({ message: 'اسکریپت نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => ScriptsDto)
  scripts: ScriptsDto;

  @ApiProperty({
    type: () => SocialMediaDto,
    required: true,
    nullable: false,
    example: SocialMediaDto,
  })
  @IsNotEmpty({ message: 'شبکه اجتماعی نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMediaDto: SocialMediaDto;

  @ApiProperty({
    type: () => LinksDto,
    required: true,
    nullable: false,
    example: LinksDto,
  })
  @IsNotEmpty({ message: 'لینک برنامه نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => LinksDto)
  link: LinksDto;

  @ApiProperty({
    type: () => SupportDto,
    required: true,
    nullable: false,
    example: SupportDto,
  })
  @IsNotEmpty({ message: 'پشتیبانی نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => SupportDto)
  supportDto: SupportDto;

  @ApiProperty({
    type: () => RepairDto,
    required: true,
    nullable: false,
    example: RepairDto,
  })
  @IsNotEmpty({ message: 'حالت تعمیر نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => RepairDto)
  repairDto: RepairDto;

  @ApiProperty({
    type: () => LogoDto,
    required: true,
    nullable: false,
    example: LogoDto,
  })
  @IsNotEmpty({ message: 'لوگو نمیتواند خالی باشد' })
  @ValidateNested()
  @Type(() => LogoDto)
  logo: LogoDto;
}
