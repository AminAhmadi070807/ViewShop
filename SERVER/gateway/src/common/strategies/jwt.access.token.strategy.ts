import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import { statusMessages } from '../messages/status.message';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-jwt-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: express.Request) => {
          const token: string | undefined = req.cookies['access_token'] as
            | string
            | undefined;

          if (!token) return null;

          return token;
        },
      ]),
      secretOrKey: process.env.CORE_JWT_ACCESS_TOKEN_SECRET_KEY as string,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    if (!payload) throw new UnauthorizedException(statusMessages.fa['401']);

    return {
      userId: payload.userId,
      role: payload.role,
    };
  }
}
