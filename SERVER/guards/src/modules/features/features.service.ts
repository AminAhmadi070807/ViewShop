import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';
import { ValidateTitle } from '../../common/validations/title.dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  create(data: ValidateTitle) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ValidateTitle) {}

  remove(id: string) {}
}
