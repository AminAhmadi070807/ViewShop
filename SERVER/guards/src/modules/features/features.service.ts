import { Injectable } from '@nestjs/common';
import { FeatureDto } from './dto/feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  create(data: FeatureDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: FeatureDto) {}

  remove(id: string) {}
}
