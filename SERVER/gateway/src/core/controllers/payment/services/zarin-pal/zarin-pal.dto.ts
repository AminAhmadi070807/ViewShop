import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum status {
  OK = 'OK',
  NOK = 'NOK',
}

export class ZarinPalVerifyDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsString({ message: 'کلید پرداخت نامعتبر است' })
  @MinLength(36, { message: 'کلید پرداخت نامعتبر است' })
  @MaxLength(36, { message: 'کلید پرداخت نامعتبر است' })
  Authority: string;

  @ApiProperty({ type: String, enum: status, example: status.OK })
  @IsEnum(status, { message: 'وضیعت پرداخت نامعتبر است' })
  Status: string;
}
