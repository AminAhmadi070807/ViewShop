import { Injectable } from '@nestjs/common';
import { Auth } from '../../auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CleanupJob {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  async cleanup() {
    const result: Auth[] = await this.authRepository.find();

    for (const auth of result) {
      const checkDate = new Date(auth.createdAt);
      checkDate.setMonth(checkDate.getMonth() + 1);

      if (new Date() > checkDate) {
      }
    }
  }
}
