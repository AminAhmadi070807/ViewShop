import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    type: 'string',
    description: 'the permission id',
    example: 'enter a permission id',
    nullable: false,
    minLength: 36,
    maxLength: 66,
  })
  @IsNotEmpty({ message: 'ایدی پرمیژن نباید خالی باشد' })
  @IsString({ message: 'ایدی پرمیژن باید یک uuid معتبر باشد' })
  @IsUUID()
  @IsOptional()
  permissionId?: string;

  @ApiProperty({
    type: 'string',
    description: 'the role title',
    nullable: false,
    minLength: 3,
    maxLength: 24,
    example: 'enter the role title',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;
}
