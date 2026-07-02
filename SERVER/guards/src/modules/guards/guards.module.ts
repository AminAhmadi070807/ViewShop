import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { GuardsController } from './guards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [GuardsController],
  providers: [GuardsService],
  imports: [TypeOrmModule.forFeature([Guard]), UsersModule, RolesModule],
})
export class GuardsModule {}
