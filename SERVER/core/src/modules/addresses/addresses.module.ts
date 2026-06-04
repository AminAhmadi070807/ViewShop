import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [TypeOrmModule.forFeature([Address, User])],
})
export class AddressesModule {}
