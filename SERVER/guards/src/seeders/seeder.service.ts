import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { GuardsSeeder } from './guards/guards.service';
import { RoleSeeder } from './roles/roles.service';
import { SeedersSingularsService } from './singulars/singulards.service';
import { PermissionSeeder } from './permissions/permissions.service';
import { UserSeeder } from './users/users.service';
import { FeaturesSeeder } from './features/features.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly seedersFeaturesService: FeaturesSeeder,
    private readonly seedersGuardsService: GuardsSeeder,
    private readonly seedersRolesService: RoleSeeder,
    private readonly seedersSingularsService: SeedersSingularsService,
    private readonly seedersPermissionsService: PermissionSeeder,
    private readonly seedersUsersService: UserSeeder,
  ) {}

  async onApplicationBootstrap() {
    await this.seedersFeaturesService.seeder();
    await this.seedersGuardsService.seeder();
    await this.seedersRolesService.seeder();
    await this.seedersSingularsService.seeder();
    await this.seedersPermissionsService.seeder();
    await this.seedersUsersService.seeder();
  }
}
