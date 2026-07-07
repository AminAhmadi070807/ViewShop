import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { AuthLoginDto, AuthRegisterDto, AuthVerifyOtp } from './auth.dto';
import express from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import { firstValueFrom } from 'rxjs';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
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
  register(@Body() data: AuthRegisterDto) {
    return this.coreService.send('AUTH:REGISTER', data);
  }

  @Public()
  @Post('login')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  async login(@Body() data: AuthLoginDto, @Res() res: express.Response) {
    // get tokens from core microservice
    const result: AuthInterface = (await firstValueFrom(
      this.coreService.send('AUTH:LOGIN', {
        phone: data.phone,
        password: data.password,
      }),
    )) as AuthInterface;

    // set refresh & access token to cookies
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
      statusCode: 200,
      message: statusMessages.fa.AUTH['200'],
      body: null,
    });
  }

  @Public()
  @Post('verify_otp/:id')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiCreatedResponse({ description: statusMessages.fa.AUTH['201'] })
  async verifyOTP(
    @Param('id') id: string,
    @Body() data: AuthVerifyOtp,
    @Res() res: express.Response,
  ) {
    // get tokens from core microservice
    const result: AuthInterface = (await firstValueFrom(
      this.coreService.send('AUTH:VERIFY_OTP', {
        route: id,
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
      statusCode: 200,
      message: statusMessages.fa.AUTH['200'],
      body: null,
    });
  }

  @Post('verify')
  @PublicAccess()
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  async varify(@Req() req: express.Request, @Res() res: express.Response) {
    const payload: JwtRefreshPayload = req.user as JwtRefreshPayload;

    const result: AuthVerifyInterface = (await firstValueFrom(
      this.coreService.send('AUTH:VERIFY', {
        userId: payload.userId,
        secret: payload.secret,
      }),
    )) as AuthVerifyInterface;

    if (!result) {
      throw new UnauthorizedException('The Refresh Token is not valid.');
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
  @ApiOkResponse({ description: statusMessages.fa.AUTH['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404' })
  logout(@Req() req: express.Request) {
    const payload: JwtRefreshPayload = req.user as JwtRefreshPayload;

    return this.coreService.send('AUTH:LOGOUT', {
      userId: payload.userId,
      secret: payload.secret,
    });
  }
}
