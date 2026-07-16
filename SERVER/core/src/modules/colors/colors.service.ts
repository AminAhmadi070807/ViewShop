import { Injectable } from '@nestjs/common';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorsService {
  create(data: ColorDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ColorDto) {}

  remove(id: string) {}
}
