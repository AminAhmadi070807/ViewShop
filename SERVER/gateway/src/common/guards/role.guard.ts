import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UserRoleEnum } from '../enums/core/users/role.enum';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import { statusMessages } from '../messages/status.message';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get public decorator
    const isPublic: boolean = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) return true;

    // get roles from role decorator
    const requiredRoles: UserRoleEnum[] = this.reflector.getAllAndOverride<
      UserRoleEnum[]
    >(ROLES_KEY, [context.getClass(), context.getHandler()]);

    if (!requiredRoles?.length) return true;

    const req: express.Request = context.switchToHttp().getRequest();
    // get user jwtPayload
    const user: JwtPayload | undefined = req.user as JwtPayload | undefined;

    // send forbidden error
    if (!user) throw new ForbiddenException(statusMessages.fa['403']);

    // user role is admin
    const isAdmin: boolean = user.role === UserRoleEnum.ADMIN;
    // validate user role in role decorator
    const validRole: boolean = requiredRoles.includes(user.role);

    // validate admin role and user role
    const validate: boolean = validRole || isAdmin;

    // send forbidden error
    if (!validate) throw new ForbiddenException(statusMessages.fa['403']);

    return true;
  }
}
