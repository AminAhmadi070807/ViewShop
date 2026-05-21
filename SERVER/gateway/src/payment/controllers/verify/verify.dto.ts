import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

enum ZarinPalVerifyEnum {
  OK = 'OK',
  NOK = 'NOK',
}

export class ZarinPalVerifyDto {
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsString({ message: 'دیتا نادرست است' })
  @MinLength(36, { message: 'دیتا نادرست است' })
  @MaxLength(36, { message: 'دیتا نادرست است' })
  Authority: string;

  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsEnum(ZarinPalVerifyEnum, { message: 'دیتا نادرست است' })
  Status: ZarinPalVerifyEnum;
}
