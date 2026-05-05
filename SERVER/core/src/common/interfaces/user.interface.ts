import { User } from '../../modules/users/entities/user.entity';
import { HttpStatus } from '@nestjs/common';

export interface UserInterface {
  body: User | User[] | null;
  message: string | null;
  status: HttpStatus;
}
