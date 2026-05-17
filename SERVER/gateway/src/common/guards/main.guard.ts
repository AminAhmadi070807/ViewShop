import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GuardsService } from '../../guards/guards.service';
import { firstValueFrom } from 'rxjs';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private readonly guardService: GuardsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const req: express.Request = ctx.getRequest();

    const user: JwtPayload = req.user as JwtPayload;

    await firstValueFrom(
      this.guardService.send('GUARD:VALIDATE', {
        patch: req.url,
        userId: user?.userId,
        service: req.url.split('/')[3].toUpperCase(),
        method: req.method.toUpperCase(),
      }),
    );

    return true;
  }
}
