import { UserRoleEnum } from '../enums/core/users/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLE_DECORATOR';

export const Roles = (...role: UserRoleEnum[]) => {
  return SetMetadata(ROLES_KEY, role);
};
