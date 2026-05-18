import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [TypeOrmModule.forFeature([Wallet, User])],
})
export class WalletsModule {}
