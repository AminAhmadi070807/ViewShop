import { UserRoleEnum } from '../enums/core/users/role.enum';
import { SetMetadata } from '@nestjs/common';

export const IS_ROLES_KEY = 'ROLE_DECORATOR';

export const Roles = (...role: UserRoleEnum[]) => {
  return SetMetadata(IS_ROLES_KEY, role);
};
