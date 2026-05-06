import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserInterface } from '../../common/interfaces/user.interface';
import { CustomException } from '../../common/exceptions/custom.exception.error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly usersService: UsersService,
  ) {}

  async register(data: AuthRegisterDto) {
    try {
      const user: UserInterface = await this.usersService.create(data);
    } catch (error) {
      const err = error as Error;
      throw new CustomException(err.message, 409);
    }
  }
}
