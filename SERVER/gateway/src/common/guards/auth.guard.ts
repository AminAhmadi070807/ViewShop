import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import express from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CoreService } from '../../core/core.service';

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard(
  'jwt-access-token-guard',
) {
  constructor(
    private readonly reflector: Reflector,
    private readonly coreService: CoreService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic: boolean = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
    ]);

    if (isPublic) return true;

    const ctx: HttpArgumentsHost = context.switchToHttp();
    const req: express.Request = ctx.getRequest();

    if (!req) {
      throw new UnauthorizedException('You are not authorized');
    }

    const user: Express.User | undefined = req.user;

    if (!user) throw new UnauthorizedException('You are not authorized.');

    console.log(user);

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: unknown, user: TUser, info: unknown): TUser {
    if (err || !user || info) {
      throw new UnauthorizedException(
        "You're not authorized. please authorization first.",
      );
    }

    return user;
  }
}
