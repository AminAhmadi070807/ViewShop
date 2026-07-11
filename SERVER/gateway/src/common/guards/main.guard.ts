import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { GuardsService } from '../../guards/guards.service';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private readonly guardService: GuardsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const req: express.Request = ctx.getRequest();
    const url: string[] = req.url.split('/');
    const headers = req.headers;

    const feature: string = headers['feature'] as string;
    const permission: string = headers['permission'] as string;

    // if (!feature || !permission) {
    //   throw new BadRequestException('لطفا هدر هارا درست ارسال کنید');
    // }

    const user: JwtPayload = req.user as JwtPayload;

    let payload;
    if (user) {
      payload = {
        userId: user?.userId,
        feature: feature,
        permission: permission,
        service: url[3].toUpperCase(),
        method: req.method.toUpperCase(),
      };
    } else {
      payload = {
        feature: feature,
        permission: permission,
        service: url[3].toUpperCase(),
        method: req.method.toUpperCase(),
      };
    }

    // const result = (await firstValueFrom(
    //   this.guardService.send('GUARD:VALIDATE', payload),
    // )) as
    //   | { status: number; message: string }
    //   | { error: { status: number; message: string } };
    //
    // if ('error' in result) {
    //   throw new HttpException(result.error, result.error.status);
    // }

    return true;
  }
}
