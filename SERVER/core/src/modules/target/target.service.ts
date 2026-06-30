import { Injectable } from '@nestjs/common';
import { TargetDto } from './dto/target.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from './entities/target.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

  create(data: TargetDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: TargetDto) {}

  remove(id: string) {}
}
