import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;
}

export class UpdateFilterDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است' })
  id: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;
}
