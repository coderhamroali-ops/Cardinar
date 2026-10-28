import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../core/decorators/auth.decorator';
import { CurrentUser, TokenPayload } from '../../core/decorators/current-user.decorator';
import { LoginHandler } from './login/login.handler';
import { LoginRequest } from './login/login.request';
import { MeHandler } from './me/me.handler';
import { RegisterHandler } from './register/register.handler';
import { RegisterRequest } from './register/register.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerHandler: RegisterHandler,
    private readonly loginHandler: LoginHandler,
    private readonly meHandler: MeHandler,
  ) {}

  @Post('register')
  async register(@Body() payload: RegisterRequest) {
    return await this.registerHandler.execute(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginRequest) {
    return await this.loginHandler.execute(payload);
  }

  @Auth()
  @ApiBearerAuth()
  @Get('me')
  async me(@CurrentUser() user: TokenPayload) {
    return await this.meHandler.execute(user.sub);
  }
}
