import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReportDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsNotEmpty({ message: 'شناسه هدف نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه هدف نامعتبر هست' })
  target: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'عنوان نمیتواند بیشتر از 50 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(3, { message: 'توضیحات حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'توضیحات نمیتواند بیشتر از 50 کارکتر داشته باشد' })
  description: string;
}

export class AnswerReportDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsNotEmpty({ message: 'جواب نمیتواند خالی باشد' })
  @IsString({ message: 'جواب باید رشته باشد' })
  @MinLength(3, { message: 'جواب حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(255, {
    message: 'جواب نمیتواند بیشتر از 255 کارکتر داشته باشد',
  })
  answer: string;
}
