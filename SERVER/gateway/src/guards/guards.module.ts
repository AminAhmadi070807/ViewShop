import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';
import { PermissionsController } from './controllers/permissions/permission.controller';
import { RoleController } from './controllers/roles/role.controller';
import { SingularController } from './controllers/singulares/singular.controller';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  providers: [GuardsService],
  controllers: [PermissionsController, RoleController, SingularController],
})
export class GuardsModule {}
