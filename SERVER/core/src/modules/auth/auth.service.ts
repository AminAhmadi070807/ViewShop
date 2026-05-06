import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly usersService: UsersService,
  ) {}

  register(data: AuthRegisterDto) {
    return 'This action adds a new auth';
  }
}
