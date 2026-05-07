import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { AuthLoginDto } from './auth.dto';
import express from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import { firstValueFrom } from 'rxjs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('core/auth')
export class AuthController {
  constructor(private readonly coreService: CoreService) {}

  // send request from login user
  @Public()
  @ApiNotFoundResponse({ description: 'User not found for this phone number.' })
  @ApiOkResponse({ description: 'Login successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('login')
  async login(
    @Body() data: AuthLoginDto,
    @Req() req: express.Request,
    @Res() res: express.Response,
  ) {
    const userAgent: string | undefined = req.headers['user-agent'];
    const ip: string | undefined = req.ip;
    const auth: { access_token: string; refresh_token: string } =
      (await firstValueFrom(
        this.coreService.send('AUTH:LOGIN', {
          phone: data.phone,
          password: data.password,
          device: userAgent,
          ip: ip,
        }),
      )) as { access_token: string; refresh_token: string };

    res.cookie('refresh_token', auth.refresh_token, {
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      priority: 'high',
    });
    res.cookie('access_token', auth.access_token, {
      secure: true,
      maxAge: 15 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      priority: 'high',
    });

    return res.status(200);
  }
}
