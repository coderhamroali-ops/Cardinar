import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/entities/user.entity';
import { createSession } from '../session';
import { LoginRequest } from './login.request';

@Injectable()
export class LoginHandler {
  constructor(private readonly jwtService: JwtService) {}

  async execute(payload: LoginRequest) {
    const login = payload.login.trim();
    const user = await UserEntity.findOne({
      where: [{ email: login.toLowerCase() }, { phoneNumber: login }],
      select: { id: true, fullName: true, email: true, phoneNumber: true, isAdmin: true, password: true },
    });
    if (!user || !(await bcrypt.compare(payload.password, user.password))) {
      throw new UnauthorizedException('Login or password is incorrect');
    }
    return createSession(this.jwtService, user);
  }
}
