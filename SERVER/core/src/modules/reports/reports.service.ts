import { Injectable } from '@nestjs/common';
import { AnswerReportDto, ReportDto } from './dto/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { TargetService } from '../target/target.service';
import { RpcException } from '@nestjs/microservices';
import { Validate } from '../../common/validations/validate.dto';

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

  async findAll(page: number = 1) {
    try {
      const result: Report[] = await this.reportsRepository.find({
        take: (page ?? 1) * 15,
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

  async findOne(data: Validate) {
    try {
      const result = await this.reportsRepository.findOne({
        where: [
          { id: data.id, user: { id: data.user } },
          { id: data.id, admin: { id: data.user } },
        ],
        relations: ['user', 'admin', 'target'],
        select: {
          user: {
            id: true,
            role: true,
            phone: true,
            fullName: true,
          },
          admin: {
            id: true,
            role: true,
            phone: true,
            fullName: true,
          },
          target: {
            id: true,
            title: true,
          },
        },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
  
}
