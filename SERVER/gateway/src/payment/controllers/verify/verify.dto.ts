import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

enum ZarinPalVerifyEnum {
  OK = 'OK',
  NOK = 'NOK',
}

export class ZarinPalVerifyDto {
  @ApiProperty({
    description: 'Authority',
    example: '',
    minLength: 36,
    maxLength: 36,
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsString({ message: 'دیتا نادرست است' })
  @MinLength(36, { message: 'دیتا نادرست است' })
  @MaxLength(36, { message: 'دیتا نادرست است' })
  Authority: string;

  @ApiProperty({
    description: 'Status',
    enum: ZarinPalVerifyEnum,
    example: ZarinPalVerifyEnum.OK,
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @IsEnum(ZarinPalVerifyEnum, { message: 'دیتا نادرست است' })
  Status: ZarinPalVerifyEnum;
}

export class ZibalVerifyDto {
  @ApiProperty({
    type: Number,
    description: 'trackId',
  })
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'trackId باید عدد باشد' })
  trackId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'status باید عدد باشد' })
  status: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'دیتا نادرست است' })
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'success باید عدد باشد' })
  success: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type((): NumberConstructor => Number)
  @IsNumber({}, { message: 'orderId باید عدد باشد' })
  orderId?: number;
}
