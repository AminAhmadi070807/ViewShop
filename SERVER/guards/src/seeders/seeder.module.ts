import { Module } from '@nestjs/common';
import { SeedersFeaturesService } from './features/features.service';
import { SeedersGuardsService } from './guards/guards.service';
import { SeedersPermissionsService } from './permissions/permissions.service';
import { SeedersRolesService } from './roles/roles.service';
import { SeedersSingularsService } from './singulars/singulards.service';
import { SeedersUsersService } from './users/users.service';
import { SeederService } from './seeder.service';

@Module({
  imports: [],
  providers: [
    SeederService,
    SeedersFeaturesService,
    SeedersGuardsService,
    SeedersRolesService,
    SeedersPermissionsService,
    SeedersSingularsService,
    SeedersUsersService,
  ],
})
export class SeederModule {}
