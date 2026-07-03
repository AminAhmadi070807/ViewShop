import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';
import { PermissionsController } from './controllers/permissions/permission.controller';
import { RoleController } from './controllers/roles/role.controller';
import { SingularController } from './controllers/singulares/singular.controller';
import { UserController } from './controllers/users/user.controller';
import { GuardController } from './controllers/guards/guard.controller';
import { FeatureController } from './controllers/features/feature.controller';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  providers: [GuardsService],
  controllers: [
    PermissionsController,
    RoleController,
    SingularController,
    UserController,
    GuardController,
    FeatureController,
  ],
  exports: [GuardsService],
})
export class GuardsModule {}
