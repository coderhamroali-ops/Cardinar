import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthController } from './auth.controller';
import { LoginHandler } from './login/login.handler';
import { MeHandler } from './me/me.handler';
import { RegisterHandler } from './register/register.handler';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterHandler,
    LoginHandler,
    MeHandler,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
