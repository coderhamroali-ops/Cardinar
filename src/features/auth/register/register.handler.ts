import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/entities/user.entity';
import { createSession } from '../session';
import { RegisterRequest } from './register.request';

@Injectable()
export class RegisterHandler {
  constructor(private readonly jwtService: JwtService) {}

  async execute(payload: RegisterRequest) {
    const email = payload.email.toLowerCase();
    const exists = await UserEntity.exists({ where: [{ email }, { phoneNumber: payload.phoneNumber }] });
    if (exists) throw new ConflictException('Email or phone number is already registered');

    // isAdmin doim false: mijoz o'ziga admin huquqini bera olmaydi
    const user = await UserEntity.create({
      ...payload,
      email,
      password: await bcrypt.hash(payload.password, 10),
      isAdmin: false,
    }).save();
    return createSession(this.jwtService, user);
  }
}
