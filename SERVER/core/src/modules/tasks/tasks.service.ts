import { Injectable } from '@nestjs/common';
import { CleanupJob } from './jobs/cleanup.job';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly cleanUpJob: CleanupJob) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  cleanOtpData() {
    return this.cleanUpJob.cleanup();
  }
}
