import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [TypeOrmModule.forFeature([Wallet])],
})
export class WalletModule {}
