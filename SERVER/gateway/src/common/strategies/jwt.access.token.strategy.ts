import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import bcrypt from 'bcrypt';
import { CoreService } from '../../core/core.service';

@Injectable()
export class JwtAccessTokenGuard extends PassportStrategy(
  Strategy,
  'jwt-access-token-guard',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly coreService: CoreService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: express.Request) => {
          const token: string | null = req.cookies['access_token'] as
            | string
            | null;

          if (token) return token;

          return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        },
      ]),
      secretOrKey: config.get<string>(
        'CORE_JWT_ACCESS_TOKEN_SECRET_KEY',
      ) as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const isValidId: boolean = (await bcrypt.compare(
      payload.sub,
      payload.hashValue,
    )) as boolean;

    if (!isValidId) {
      throw new UnauthorizedException(
        'You are not authorized. please authorization first.',
      );
    }

    return { id: payload.sub, role: payload.role };
  }
}
