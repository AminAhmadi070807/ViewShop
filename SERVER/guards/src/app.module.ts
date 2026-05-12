import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from './common/config/typeorm.config';
import { GuardsModule } from './modules/guards/guards.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from './common/config/client.config';
import { CoreModule } from './core/core.module';
import { SingularModule } from './modules/singular/singular.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmModuleConfig),
    ClientsModule.registerAsync(ClientsModuleConfig),
    GuardsModule,
    RolesModule,
    PermissionsModule,
    UsersModule,
    CoreModule,
    SingularModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
