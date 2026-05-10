import { UserRoleEnum } from '../enums/core/users/role.enum';
import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_ACCESS_KEY } from './public.access.decorator';

export const IS_ROLE = 'ROLE_DECORATOR';

export const Role = (...role: UserRoleEnum[]) => {
  return SetMetadata(IS_PUBLIC_ACCESS_KEY, role);
};
