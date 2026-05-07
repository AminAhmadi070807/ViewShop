import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import { CoreService } from '../../core/core.service';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-jwt-token',
) {
  constructor(private readonly coreService: CoreService) {
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
    if (!payload) {
      throw new UnauthorizedException('Please authorized first.');
    }

    return {
      userId: payload.userId,
      role: payload.role,
    };
  }
}
