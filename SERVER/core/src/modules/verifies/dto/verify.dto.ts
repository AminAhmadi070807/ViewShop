import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ZarinPalVerifyEnum } from '../../../common/enums/verifye/status.enum';
import { Type } from 'class-transformer';

export class ZarinPalVerifyDto {
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsString({ message: 'دیتا نادرست است' })
  @MinLength(36, { message: 'دیتا نادرست است' })
  @MaxLength(36, { message: 'دیتا نادرست است' })
  authority: string;

  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsEnum(ZarinPalVerifyEnum, { message: 'دیتا نادرست است' })
  status: ZarinPalVerifyEnum;

  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsUUID('4', { message: 'دیتا نادرست است' })
  userId: string;
}

export class ZibalVerifyDto {
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'trackId باید عدد باشد' })
  trackId: number;

  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'status باید عدد باشد' })
  status: number;

  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'success باید عدد باشد' })
  success: number;

  @IsOptional()
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'orderId باید عدد باشد' })
  orderId?: number;

  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsUUID('4', { message: 'دیتا نادرست است' })
  userId: string;
}
