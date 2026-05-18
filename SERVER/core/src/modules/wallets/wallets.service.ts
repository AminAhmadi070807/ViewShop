import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async charging(data: CreateWalletDto) {
    const user: User | null = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
      relations: ['wallet'],
    });

    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    if (user.wallet) user.wallet.money += Number(data.amount);

    const wallet: Wallet = this.walletRepository.create({
      user: user,
      money: data.amount || 0,
    });

    await this.walletRepository.save(wallet);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: null,
    };
  }

  findAll() {
    return `This action returns all wallets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
