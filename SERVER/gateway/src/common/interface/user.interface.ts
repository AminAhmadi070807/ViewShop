import { HttpStatus } from '@nestjs/common';
import { UserRoleEnum } from '../enums/core/users/role.enum';

interface user {
  id: string;
  phone: string;
  fullName: string;
  role: UserRoleEnum;
}

export interface UserInterface {
  body: user;
  message: string | null;
  status: HttpStatus;
}
