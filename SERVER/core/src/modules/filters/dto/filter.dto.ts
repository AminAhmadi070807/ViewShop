import { ArrayNotEmpty, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FilterDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ArrayNotEmpty({ message: 'ارایه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است', each: true })
  filterTypes: string[];
}
