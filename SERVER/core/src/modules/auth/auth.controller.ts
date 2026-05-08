import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto, AuthValidateDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('AUTH:REGISTER')
  register(@Payload() data: AuthRegisterDto) {
    return this.authService.register(data);
  }

  @MessagePattern('AUTH:LOGIN')
  login(@Payload() data: AuthLoginDto) {
    return this.authService.login(data);
  }

  @MessagePattern('AUTH:VALIDATE')
  validateRefreshToken(@Payload() data: AuthValidateDto) {
    return this.authService.validateRefreshToken(data);
  }

  @MessagePattern('AUTH:VERIFY')
  verifyToken(@Payload() data: AuthValidateDto) {
    return this.authService.verifyToken(data);
  }
}
