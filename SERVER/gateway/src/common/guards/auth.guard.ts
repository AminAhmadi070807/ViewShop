import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtPayload } from '../validation/jwt.dto';
import express from 'express';

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic: boolean = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const canactivate = (await super.canActivate(context)) as boolean;

    const req: express.Request = context.switchToHttp().getRequest();

    if (!req) {
      throw new UnauthorizedException(
        'You are not authorized. please authorized first.',
      );
    }

    const user: Express.User | undefined = req.user;

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized. please authorized first.',
      );
    }

    return canactivate;
  }

  handleRequest<TUser = JwtPayload>(
    error: any,
    user: TUser,
    info: any,
    ctx: ExecutionContext,
  ): TUser {
    if (error) throw new UnauthorizedException('Jwt auth error');

    if (!user) throw new UnauthorizedException('Please authorized first.');

    if (!info) throw new UnauthorizedException('Please authorized first.');

    return user;
  }
}
