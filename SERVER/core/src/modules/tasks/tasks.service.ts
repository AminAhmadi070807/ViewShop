import { Injectable } from '@nestjs/common';
import { CleanupJob } from './jobs/cleanup.job';

@Injectable()
export class TasksService {
  constructor(private readonly cleanUpJob: CleanupJob) {}

  cleanOtpData() {
    return this.cleanUpJob.cleanup();
  }
}
