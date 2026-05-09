import { AuthGuard } from '@nestjs/passport';
import {
  BadRequestException,
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
import { IS_PUBLIC_ACCESS_KEY } from '../decorators/public.access.decorator';
import { statusMessages } from '../messages/status.message';

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
    const isAccessPublic: boolean = this.reflector.getAllAndOverride(
      IS_PUBLIC_ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic || isAccessPublic) return true;

    const canactivate = (await super.canActivate(context)) as boolean;

    const req: express.Request = context.switchToHttp().getRequest();

    if (!req) throw new UnauthorizedException(statusMessages.fa['401']);

    const userReq: JwtPayload | undefined = req.user as JwtPayload | undefined;

    if (!userReq) {
      throw new UnauthorizedException(statusMessages.fa['401']);
    }

    await firstValueFrom(this.coreService.send('USER:ONE', userReq.userId));

    return canactivate;
  }

  handleRequest<TUser = JwtPayload>(error: any, user: TUser, info: any): TUser {
    if (error) throw new UnauthorizedException(statusMessages.fa['401']);

    if (!user) throw new UnauthorizedException(statusMessages.fa['401']);

    if (info) throw new BadRequestException(statusMessages.fa['400']);

    return user;
  }
}
