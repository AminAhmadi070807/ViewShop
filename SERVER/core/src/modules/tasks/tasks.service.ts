import { Injectable } from '@nestjs/common';
import { CleanupJob } from './jobs/cleanup.job';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly cleanUpJob: CleanupJob) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  cleanOtpData() {
    return this.cleanUpJob.cleanup();
  }
}
