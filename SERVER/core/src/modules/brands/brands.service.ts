import { Injectable } from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  create(data: BrandDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: BrandDto) {}

  remove(id: string) {}
}
