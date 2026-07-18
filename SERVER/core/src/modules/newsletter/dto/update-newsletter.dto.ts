import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsletterDto } from './create-newsletter.dto';

export class UpdateNewsletterDto extends PartialType(CreateNewsletterDto) {
  id: number;
}
