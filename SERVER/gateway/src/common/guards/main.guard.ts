import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GuardsService } from '../../guards/guards.service';
import { firstValueFrom } from 'rxjs';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import { validate } from 'uuid';

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private readonly guardService: GuardsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const req: express.Request = ctx.getRequest();
    const url: string[] = req.url.split('/');

    const lastIndex: number = url.length - 1;

    if (this.isUuid(url[lastIndex])) url[lastIndex] = ':id';
    else if (this.isPhoneNumber(url[lastIndex])) url[lastIndex] = ':phone';
    else if (url[lastIndex].startsWith('verify')) {
      url[lastIndex] = url[lastIndex].split('?')[0];
    } else if (url[lastIndex - 1] === 'search') {
      url[lastIndex] = 'search';
    }

    const user: JwtPayload = req.user as JwtPayload;

    await firstValueFrom(
      this.guardService.send('GUARD:VALIDATE', {
        patch: url.join('/'),
        userId: user?.userId,
        service: url[3].toUpperCase(),
        method: req.method.toUpperCase(),
      }),
    );

    return true;
  }

  private isUuid(value: string): boolean {
    return validate(value);
  }

  private isPhoneNumber(value: string): boolean {
    return /^(\+98|0)?9\d{9}$/.test(value);
  }
}
