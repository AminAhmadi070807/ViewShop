import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SeedersGuardsService } from './guards/guards.service';
import { SeedersRolesService } from './roles/roles.service';
import { SeedersSingularsService } from './singulars/singulards.service';
import { SeedersPermissionsService } from './permissions/permissions.service';
import { SeedersUsersService } from './users/users.service';
import { SeedersFeaturesService } from './features/features.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly seedersFeaturesService: SeedersFeaturesService,
    private readonly seedersGuardsService: SeedersGuardsService,
    private readonly seedersRolesService: SeedersRolesService,
    private readonly seedersSingularsService: SeedersSingularsService,
    private readonly seedersPermissionsService: SeedersPermissionsService,
    private readonly seedersUsersService: SeedersUsersService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedersFeaturesService.seeder();
  }
}
