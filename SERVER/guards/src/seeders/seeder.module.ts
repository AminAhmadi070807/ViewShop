import { Module } from '@nestjs/common';
import { FeaturesSeeder } from './features/features.service';
import { GuardsSeeder } from './guards/guards.service';
import { PermissionSeeder } from './permissions/permissions.service';
import { RoleSeeder } from './roles/roles.service';
import { SeedersSingularsService } from './singulars/singulards.service';
import { UserSeeder } from './users/users.service';
import { SeederService } from './seeder.service';
import { FeaturesModule } from '../modules/features/features.module';
import { GuardsModule } from '../modules/guards/guards.module';
import { PermissionsModule } from '../modules/permissions/permissions.module';
import { RolesModule } from '../modules/roles/roles.module';
import { SingularModule } from '../modules/singular/singular.module';
import { UsersModule } from '../modules/users/users.module';

@Module({
  imports: [
    FeaturesModule,
    GuardsModule,
    PermissionsModule,
    RolesModule,
    SingularModule,
    UsersModule,
  ],
  providers: [
    SeederService,
    SeedersSingularsService,
    RoleSeeder,
    GuardsSeeder,
    PermissionSeeder,
    FeaturesSeeder,
    UserSeeder,
  ],
})
export class SeederModule {}
