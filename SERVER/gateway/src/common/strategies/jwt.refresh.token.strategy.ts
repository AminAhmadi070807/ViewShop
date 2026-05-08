import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import express from 'express';
import { JwtRefreshPayload } from '../validation/jwt.dto';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt-token',
) {
  constructor() {
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

  validate(payload: JwtRefreshPayload): JwtRefreshPayload {
    if (!payload) {
      throw new UnauthorizedException('Please authorized first.');
    }

    return payload;
  }
}
