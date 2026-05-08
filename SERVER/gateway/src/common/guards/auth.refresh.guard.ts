import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { JwtRefreshPayload } from '../validation/jwt.dto';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CoreService } from '../../core/core.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { firstValueFrom } from 'rxjs';

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

    if (!req) throw new UnauthorizedException('please authorized first.');

    // get user payload from request
    const userReq: JwtRefreshPayload | undefined = req.user as
      | JwtRefreshPayload
      | undefined;

    // send unauthorized error
    if (!userReq) throw new UnauthorizedException('please authorized first.');

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
    if (error) throw new UnauthorizedException('Jwt auth error.');

    if (!user) throw new UnauthorizedException('Please authorized first.');

    if (info) {
      throw new UnauthorizedException('The Refresh Token is not valid.');
    }

    return user;
  }
}
