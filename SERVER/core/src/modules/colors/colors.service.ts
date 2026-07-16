import { Injectable } from '@nestjs/common';
import { ColorDto } from './dto/color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  create(data: ColorDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ColorDto) {}

  remove(id: string) {}
}
