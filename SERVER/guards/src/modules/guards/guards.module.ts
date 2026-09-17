import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { GuardsController } from './guards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { UsersModule } from '../users/users.module';
import { FeaturesModule } from '../features/features.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  controllers: [GuardsController],
  providers: [GuardsService],
  imports: [
    TypeOrmModule.forFeature([Guard]),
    UsersModule,
    FeaturesModule,
    PermissionsModule,
  ],
  exports: [GuardsService, TypeOrmModule],
})
export class GuardsModule {}
