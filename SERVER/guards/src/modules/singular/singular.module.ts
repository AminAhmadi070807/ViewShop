import { Module } from '@nestjs/common';
import { SingularService } from './singular.service';
import { SingularController } from './singular.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Module({
  controllers: [SingularController],
  providers: [SingularService],
  imports: [TypeOrmModule.forFeature([Singular, Role, Permission])],
  exports: [SingularService],
})
export class SingularModule {}
