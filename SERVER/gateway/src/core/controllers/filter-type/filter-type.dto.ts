import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTypeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
    example: false,
  })
  @IsBoolean({ message: 'لطفا برای حالت عمومی را درست ست کنید' })
  public: boolean;
}
