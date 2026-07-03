import { forwardRef, Module } from '@nestjs/common';
import { SingularService } from './singular.service';
import { SingularController } from './singular.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { Feature } from '../features/entities/feature.entity';

@Module({
  controllers: [SingularController],
  providers: [SingularService],
  imports: [
    TypeOrmModule.forFeature([Singular, Feature]),
    PermissionsModule,
    forwardRef(() => RolesModule),
  ],
  exports: [SingularService],
})
export class SingularModule {}
