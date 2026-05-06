import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('AUTH:REGISTER')
  register(@Payload() data: AuthRegisterDto) {
    return this.authService.register(data);
  }
}
