import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsService {
  create(data: CreateColorDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: CreateColorDto) {}

  remove(id: string) {}
}
