import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GuardsService } from '../../guards/guards.service';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import { validate } from 'uuid';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private readonly guardService: GuardsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const req: express.Request = ctx.getRequest();
    const url: string[] = req.url.split('/');

    const user: JwtPayload = req.user as JwtPayload;

    let payload;
    if (user) {
      payload = {
        userId: user?.userId,
        feature: url[4].toUpperCase(),
        permission: url[5].toUpperCase(),
        service: url[3].toUpperCase(),
        method: req.method.toUpperCase(),
      };
    } else {
      payload = {
        feature: url[4].toUpperCase(),
        permission: url[5].toUpperCase(),
        service: url[3].toUpperCase(),
        method: req.method.toUpperCase(),
      };
    }

    await firstValueFrom(this.guardService.send('GUARD:VALIDATE', payload));

    return true;
  }

  private isUuid(value: string): boolean {
    return validate(value);
  }

  private isPhoneNumber(value: string): boolean {
    return /^(\+98|0)?9\d{9}$/.test(value);
  }
}
