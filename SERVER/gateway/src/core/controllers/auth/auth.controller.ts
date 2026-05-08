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

@Controller('core/auth')
export class AuthController {
  constructor(private readonly coreService: CoreService) {}

  // refresh token options
  private readonly refreshTokenOptions = {
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    priority: 'high',
  };
  // access token options
  private readonly accessTokenOptions = {
    secure: true,
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
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

  // authorization error
  @Public()
  @ApiConflictResponse({
    description: 'The user already exist',
  })
  @ApiOkResponse({ description: 'The authentication successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('register')
  register(@Body() data: AuthRegisterDto) {
    return this.coreService.send('AUTH:REGISTER', data);
  }

  // authorization error
  @Public()
  @ApiNotFoundResponse({
    description: 'The user not found for this phone number.',
  })
  @ApiOkResponse({ description: 'The authentication successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('login')
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
      message: 'Login successfully.',
      body: null,
    });
  }

  // authorization error
  @Public()
  @ApiNotFoundResponse({
    description: 'The user not found for this phone number.',
  })
  @ApiOkResponse({ description: 'The authentication successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('verify_otp/:id')
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
      message: 'Login successfully.',
      body: null,
    });
  }

  // verify access token
  @PublicAccess()
  @ApiOkResponse({ description: 'The verify successfully.' })
  @ApiUnauthorizedResponse({ description: 'please authorized first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  @Post('verify')
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
      message: 'The verify successfully.',
      body: null,
    });
  }
}
