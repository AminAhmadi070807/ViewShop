import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class PageFilter {
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'صفحه باید رشته باشد' },
  )
  @IsInt({ message: 'صفحه باید اینتیجر باشد' })
  @IsOptional({ message: 'صفحه اختیاری است' })
  page: number;
}
