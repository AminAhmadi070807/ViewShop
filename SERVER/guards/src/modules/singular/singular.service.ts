import { Injectable } from '@nestjs/common';
import { SingularDto } from './dto/singular.dto';
import { UpdateSingularDto } from './dto/update-singular.dto';

@Injectable()
export class SingularService {
  create(createSingularDto: SingularDto) {
    return 'This action adds a new singular';
  }

  findAll() {
    return `This action returns all singular`;
  }

  findOne(id: number) {
    return `This action returns a #${id} singular`;
  }

  update(id: number, updateSingularDto: UpdateSingularDto) {
    return `This action updates a #${id} singular`;
  }

  remove(id: number) {
    return `This action removes a #${id} singular`;
  }
}
