import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import express from 'express';
import { CoreService } from '../../core/core.service';
import { firstValueFrom } from 'rxjs';
import { JwtRefreshPayload } from '../validation/jwt.dto';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt-token',
) {
  constructor(private readonly coreService: CoreService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: express.Request) => {
          const token: string | undefined = req.cookies['refresh_token'] as
            | string
            | undefined;

          if (!token) return null;

          return token;
        },
      ]),
      secretOrKey: process.env.CORE_JWT_REFRESH_TOKEN_SECRET_KEY as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtRefreshPayload) {
    if (!payload) {
      throw new UnauthorizedException('Please authorized first.');
    }

    await firstValueFrom(
      this.coreService.send('AUTH:VALIDATE', {
        userId: payload.userId,
        secret: payload.secret,
      }),
    );

    return payload;
  }
}
