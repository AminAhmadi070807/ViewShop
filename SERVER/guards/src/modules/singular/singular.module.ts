import { forwardRef, Module } from '@nestjs/common';
import { SingularService } from './singular.service';
import { SingularController } from './singular.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { FeaturesModule } from '../features/features.module';

@Module({
  controllers: [SingularController],
  providers: [SingularService],
  imports: [
    TypeOrmModule.forFeature([Singular]),
    PermissionsModule,
    forwardRef(() => RolesModule),
    FeaturesModule,
  ],
  exports: [SingularService],
})
export class SingularModule {}
