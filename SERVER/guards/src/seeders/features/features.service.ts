import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from '../../modules/features/entities/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedersFeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async seeder() {}
}
