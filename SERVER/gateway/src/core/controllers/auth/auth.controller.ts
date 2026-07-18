import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { AuthLoginDto, AuthRegisterDto, AuthVerifyOtp } from './auth.dto';
import express from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import { firstValueFrom } from 'rxjs';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthInterface,
  AuthVerifyInterface,
} from '../../../common/interface/auth.interface';
import { PublicAccess } from '../../../common/decorators/public.access.decorator';
import { JwtRefreshPayload } from '../../../common/validation/jwt.dto';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/auth')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class AuthController {
  constructor(private readonly coreService: CoreService) {}

  // refresh token options
  private readonly refreshTokenOptions = {
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    priority: 'high',
  };
  // access token options
  private readonly accessTokenOptions = {
    secure: true,
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    priority: 'high',
  };

  // set jwt token in cookies
  setToken(
    res: express.Response,
    title: string,
    token: string,
    options: object,
  ) {
    res.cookie(title, token, options);
  }

  @Public()
  @Post('register')
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'AUTH',
      enum: ['AUTH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'REGISTER',
      enum: ['REGISTER'],
    },
  ])
  register(@Body() data: AuthRegisterDto) {
    return this.coreService.send('AUTH:REGISTER', data);
  }

  @Public()
  @Post('login')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'AUTH',
      enum: ['AUTH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'LOGIN',
      enum: ['LOGIN'],
    },
  ])
  async login(@Body() data: AuthLoginDto, @Res() res: express.Response) {
    const result:
      | { error: { message: string; status: number } }
      | AuthInterface = (await firstValueFrom(
      this.coreService.send('AUTH:LOGIN', {
        phone: data.phone,
        password: data.password,
      }),
    )) as { error: { message: string; status: number } } | AuthInterface;

    if ('error' in result) {
      return res
        .status(result.error.status)
        .json({ ...result.error, body: null });
    }

    this.setToken(
      res,
      'refresh_token',
      result.body.refresh_token,
      this.refreshTokenOptions,
    );

    this.setToken(
      res,
      'access_token',
      result.body.access_token,
      this.accessTokenOptions,
    );

    return res.status(200).json({
      statusCode: 200,
      message: statusMessages.fa.AUTH['200'],
      body: null,
    });
  }

  @Public()
  @Post('verify_otp/:id')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiCreatedResponse({ description: statusMessages.fa.AUTH['201'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'AUTH',
      enum: ['AUTH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'VERIFY:OTP',
      enum: ['VERIFY:OTP'],
    },
  ])
  async verifyOTP(
    @Param() uuid: ValidateUUID,
    @Body() data: AuthVerifyOtp,
    @Res() res: express.Response,
  ) {
    // get tokens from core microservice
    const result = (await firstValueFrom(
      this.coreService.send('AUTH:VERIFY_OTP', {
        route: uuid.id,
        otp: data.otp,
      }),
    )) as AuthInterface;

    // set refresh token to cookies
    this.setToken(
      res,
      'refresh_token',
      result.body.refresh_token,
      this.refreshTokenOptions,
    );
    // set access token to cookies
    this.setToken(
      res,
      'access_token',
      result.body.access_token,
      this.accessTokenOptions,
    );

    // send response to client
    return res.status(200).json({
      status: 200,
      message: statusMessages.fa.AUTH['200'],
      body: null,
    });
  }

  @PublicAccess()
  @Post('verify')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'AUTH',
      enum: ['AUTH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'VERIFY:TOKEN',
      enum: ['VERIFY:TOKEN'],
    },
  ])
  async varify(@Req() req: express.Request, @Res() res: express.Response) {
    const payload: JwtRefreshPayload = req.user as JwtRefreshPayload;

    const result = (await firstValueFrom(
      this.coreService.send('AUTH:VERIFY', {
        userId: payload.userId,
        secret: payload.secret,
      }),
    )) as AuthVerifyInterface | { error: { message: string; status: number } };

    if ('error' in result) {
      return res
        .status(result.error.status)
        .json({ ...result.error, body: null });
    }

    // set access token to cookies
    this.setToken(
      res,
      'access_token',
      result.body.access_token,
      this.accessTokenOptions,
    );

    return res.status(200).json({
      statusCode: 200,
      message: statusMessages.fa.AUTH['200'],
      body: null,
    });
  }

  @Post('logout')
  @PublicAccess()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'AUTH',
      enum: ['AUTH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'LOGOUT',
      enum: ['LOGOUT'],
    },
  ])
  logout(@Req() req: express.Request) {
    const payload: JwtRefreshPayload = req.user as JwtRefreshPayload;

    return this.coreService.send('AUTH:LOGOUT', {
      userId: payload.userId,
      secret: payload.secret,
    });
  }
}
