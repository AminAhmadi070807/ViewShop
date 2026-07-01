import { Injectable } from '@nestjs/common';
import { AnswerReportDto, ReportDto } from './dto/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { TargetService } from '../target/target.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    private readonly targetService: TargetService,
  ) {}

  async create(data: ReportDto) {
    try {
      const target = await this.targetService.findOne(data.target);

      if (target instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const report: Report = this.reportsRepository.create({
        user: {
          id: data.user,
        },
        description: data.description,
        target: target.body,
        reason: data.title,
      });

      await this.reportsRepository.save(report);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result: Report[] = await this.reportsRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result: Report | null = await this.reportsRepository.findOne({
        where: {
          id,
        },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        body: result,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async answer(data: AnswerReportDto) {
    try {
      const report: Report | null = await this.reportsRepository.findOneBy({
        id: data.id,
      });

      if (!report) return new CustomException(statusMessages.fa['404'], 404);
      else if (report.isAnswer) {
        return new CustomException(statusMessages.fa['409'], 409);
      }

      await this.reportsRepository.update(data.id, {
        answer: data.answer,
        admin: {
          id: data.id,
        },
        isAnswer: true,
      });

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
