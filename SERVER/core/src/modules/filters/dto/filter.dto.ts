import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FilterDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;
}

export class FilterOptionsDto {
  @IsUUID('4', { message: 'شناسه نوع فیلتر نامعتبر است' })
  id: string;
}
