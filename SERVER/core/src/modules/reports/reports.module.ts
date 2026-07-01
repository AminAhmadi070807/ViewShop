import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { TargetModule } from '../target/target.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [TypeOrmModule.forFeature([Report]), TargetModule],
})
export class ReportsModule {}
