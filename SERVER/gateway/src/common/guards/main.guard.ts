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
    const url: string[] = req.url.split('/');

    const lastIndex: number = url.length - 1;

    if (this.isUuid(url[lastIndex])) url[lastIndex] = ':id';
    else if (this.isPhoneNumber(url[lastIndex])) url[lastIndex] = ':phone';

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
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }

  private isPhoneNumber(value: string): boolean {
    return /^(\+98|0)?9\d{9}$/.test(value);
  }
}
