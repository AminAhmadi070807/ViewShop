import { Injectable } from '@nestjs/common';
import { TargetDto } from './dto/target.dto';

@Injectable()
export class TargetService {
  create(createTargetDto: TargetDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: TargetDto) {}

  remove(id: string) {}
}
