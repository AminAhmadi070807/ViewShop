import { Injectable } from '@nestjs/common';
import { CleanupJob } from './jobs/cleanup.job';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly cleanUpJob: CleanupJob,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async cleanOtpData() {
    const result: Auth[] = await this.authRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return this.cleanUpJob.cleanup(result);
  }
}
