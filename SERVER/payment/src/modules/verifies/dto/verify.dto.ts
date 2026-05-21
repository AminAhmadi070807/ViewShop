import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ZarinPalVerifyEnum } from '../../../common/enums/verifye/status.enum';

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
