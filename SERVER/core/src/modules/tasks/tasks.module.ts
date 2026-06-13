import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CleanupJob } from './jobs/cleanup.job';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';

@Module({
  controllers: [],
  providers: [TasksService, CleanupJob],
  imports: [TypeOrmModule.forFeature([Auth])],
})
export class TasksModule {}
