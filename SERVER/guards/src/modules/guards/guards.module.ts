import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { GuardsController } from './guards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [GuardsController],
  providers: [GuardsService],
  imports: [TypeOrmModule.forFeature([Guard, Role, User])],
})
export class GuardsModule {}
