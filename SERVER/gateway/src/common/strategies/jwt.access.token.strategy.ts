import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import express from 'express';
import { JwtPayload } from '../validation/jwt.dto';
import bcrypt from 'bcrypt';
import { CoreService } from '../../core/core.service';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
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
          if (req && req.cookies) {
            const token: string | undefined = req.cookies['access_token'] as
              | string
              | undefined;

            if (!token) return null;

            return token;
          }

          return null;
        },
      ]),
      secretOrKey: config.get<string>(
        'CORE_JWT_ACCESS_TOKEN_SECRET_KEY',
      ) as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const isValidId: boolean = await bcrypt.compare(
      payload.sub,
      payload.hashValue,
    );

    if (!isValidId) return null;

    return { id: payload.sub, role: payload.role };
  }
}
