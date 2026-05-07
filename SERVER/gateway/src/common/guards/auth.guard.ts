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
import { CoreService } from '../../core/core.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard('access-jwt-token') {
  constructor(
    private readonly reflector: Reflector,
    private readonly coreService: CoreService,
  ) {
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

    const userPayload: JwtPayload | undefined = req.user as
      | JwtPayload
      | undefined;

    if (!userPayload) {
      throw new UnauthorizedException(
        'You are not authorized. please authorized first.',
      );
    }

    await firstValueFrom(this.coreService.send('USER:ONE', userPayload.userId));

    return canactivate;
  }

  handleRequest<TUser = JwtPayload>(error: any, user: TUser, info: any): TUser {
    if (error) throw new UnauthorizedException('Jwt auth error');

    if (!user) throw new UnauthorizedException('Please authorized first.');

    if (info) throw new UnauthorizedException('Please authorized first.');

    return user;
  }
}
