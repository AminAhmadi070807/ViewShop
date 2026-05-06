import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  register(data: AuthRegisterDto) {
    return 'This action adds a new auth';
  }
}
