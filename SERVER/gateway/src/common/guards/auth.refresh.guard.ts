import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { JwtRefreshPayload } from '../validation/jwt.dto';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CoreService } from '../../core/core.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { firstValueFrom } from 'rxjs';
import { statusMessages } from '../messages/status.message';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('refresh-jwt-token') {
  constructor(
    private readonly reflector: Reflector,
    private readonly coreService: CoreService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // is public route
    const isPublic: boolean = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // allowing access to route
    if (isPublic) return true;

    const can = (await super.canActivate(context)) as boolean;

    const req: express.Request = context.switchToHttp().getRequest();

    if (!req) throw new UnauthorizedException(statusMessages.fa['401']);

    // get user payload from request
    const userReq: JwtRefreshPayload | undefined = req.user as
      | JwtRefreshPayload
      | undefined;

    console.log('RESULT =>', userReq);

    // send unauthorized error
    if (!userReq) throw new UnauthorizedException(statusMessages.fa['401']);

    // validate user refresh token
    await firstValueFrom(
      this.coreService.send('AUTH:VALIDATE', {
        userId: userReq.userId,
        secret: userReq.secret,
      }),
    );

    return can;
  }

  handleRequest<TUser = JwtRefreshPayload>(
    error: unknown,
    user: TUser,
    info: unknown,
  ) {
    if (error) throw new UnauthorizedException(statusMessages.fa['401']);

    if (!user) throw new UnauthorizedException(statusMessages.fa['401']);

    if (info) {
      throw new BadRequestException(statusMessages.fa['400']);
    }

    return user;
  }
}
