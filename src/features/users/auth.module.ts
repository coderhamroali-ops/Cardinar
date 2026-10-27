import {
  Body,
  ConflictException,
  Controller,
  Get,
  Global,
  Module,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional, ApiTags, PartialType } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AuthGuard } from '../../core/auth.guard';
import { AdminCrudController } from '../../core/crud.controller';
import { Auth, CurrentUser, TokenPayload } from '../../core/decorators';
import { PHONE_REGEX } from '../requests/requests.module';
import { UserEntity } from './user.entity';

class RegisterDto {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty({ example: '+998901234567' }) @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiProperty() @IsEmail() @MaxLength(64) email: string;
  @ApiProperty() @IsString() @MinLength(8) @MaxLength(64) password: string;
}

class LoginDto {
  @ApiProperty({ description: 'Email yoki telefon raqam' }) @IsString() @MaxLength(64) login: string;
  @ApiProperty() @IsString() @MaxLength(64) password: string;
}

class AdminUpdateUserDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(64) fullName?: string;
  @ApiPropertyOptional() @IsOptional() @Matches(PHONE_REGEX) phoneNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isAdmin?: boolean;
}
class AdminCreateUserDto extends PartialType(RegisterDto) {}

@ApiTags('auth')
@Controller('auth')
class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    const email = payload.email.toLowerCase();
    const exists = await UserEntity.exists({ where: [{ email }, { phoneNumber: payload.phoneNumber }] });
    if (exists) throw new ConflictException('Email or phone number is already registered');

    const user = await UserEntity.create({
      ...payload,
      email,
      password: await bcrypt.hash(payload.password, 10),
      isAdmin: false,
    }).save();
    return this.session(user);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    const login = payload.login.trim().toLowerCase();
    const user = await UserEntity.findOne({
      where: [{ email: login }, { phoneNumber: payload.login.trim() }],
      select: { id: true, fullName: true, email: true, phoneNumber: true, isAdmin: true, password: true },
    });
    if (!user || !(await bcrypt.compare(payload.password, user.password))) {
      throw new UnauthorizedException('Login or password is incorrect');
    }
    return this.session(user);
  }

  @Auth()
  @ApiBearerAuth()
  @Get('me')
  async me(@CurrentUser() current: TokenPayload) {
    const user = await UserEntity.findOneBy({ id: current.sub });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  private async session(user: UserEntity) {
    const accessToken = await this.jwtService.signAsync({ sub: user.id, isAdmin: user.isAdmin });
    const { password: _password, ...profile } = user;
    return { accessToken, user: profile };
  }
}

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    AuthController,
    AdminCrudController('users', UserEntity, AdminCreateUserDto, AdminUpdateUserDto),
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
