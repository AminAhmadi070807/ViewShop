import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
    description: 'province value',
  })
  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  @IsString({ message: 'استان باید رشته باشد' })
  @MinLength(5, { message: 'استان حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'استان حدکثر باید 100 کارکتر داشته باشد' })
  province: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
    description: 'city value',
  })
  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  @IsString({ message: 'شهر باید رشته باشد' })
  @MinLength(3, { message: 'شهر حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'شهر حدکثر باید 100 کارکتر داشته باشد' })
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
    description: 'street value',
  })
  @IsNotEmpty({ message: 'خیابان نمیتواند خالی باشد' })
  @IsString({ message: 'خیابان باید رشته باشد' })
  @MinLength(5, { message: 'خیابان حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'خیابان حدکثر باید 100 کارکتر داشته باشد' })
  street: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
    description: 'alley value',
  })
  @IsNotEmpty({ message: 'کوچه نمیتواند خالی باشد' })
  @IsString({ message: 'کوچه باید رشته باشد' })
  @MinLength(5, { message: 'کوچه حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(100, { message: 'کوچه حدکثر باید 100 کارکتر داشته باشد' })
  alley: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
    description: ' value',
  })
  @IsNotEmpty({ message: 'آدرس نمیتواند خالی باشد' })
  @IsString({ message: 'آدرس باید رشته باشد' })
  @MinLength(5, { message: 'آدرس حدقل باید 5 تا کارکتر داشته باشد' })
  @MaxLength(255, { message: 'آدرس حدکثر باید 255 کارکتر داشته باشد' })
  address: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 10,
    maxLength: 10,
    example: '0123456789',
    description: 'postal code value',
  })
  @IsNotEmpty({ message: 'کد پستی نامعتبر است' })
  @Matches(/^[0-9]{10}$/, { message: 'کد پستی نامعتبر است' })
  postal_code: string;
}
