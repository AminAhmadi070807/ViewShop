import { HttpStatus } from '@nestjs/common';

type user = {
  id: string;
  phone: string;
  fullName: string;
};

export interface UserInterface {
  body: user;
  message: string | null;
  status: HttpStatus;
}
