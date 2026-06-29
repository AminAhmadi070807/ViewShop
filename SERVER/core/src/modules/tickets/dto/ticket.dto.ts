import { TicketsDepartmentEnum } from '../../../common/enums/tickets/tickets.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TicketDto {
  @IsNotEmpty({ message: 'دپارتمن نمیتواند خالی باشد' })
  @IsString({ message: 'دپارتمن باید رشته باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsNotEmpty({ message: 'دپارتمن نمیتواند خالی باشد' })
  @IsString({ message: 'دپارتمن باید رشته باشد' })
  @IsEnum(TicketsDepartmentEnum, { message: 'مقدار دپارتمن نادرست است' })
  department: TicketsDepartmentEnum;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(8, { message: 'عنواند حدقل باید 8 کارکتر باشد' })
  @MaxLength(50, { message: 'عنواند حدکثر میتواند 50 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'توضیحات حدقل باید 8 کارکتر باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  description: string;
}
