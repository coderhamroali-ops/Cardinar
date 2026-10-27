import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AUTH_OPTIONAL, AUTH_REQUIRED, TokenPayload } from './decorators';

// /admin/* — faqat admin, @Auth() — istalgan foydalanuvchi, qolganlari — ochiq.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const targets = [context.getHandler(), context.getClass()];
    const authRequired = this.reflector.getAllAndOverride<boolean>(AUTH_REQUIRED, targets);
    const authOptional = this.reflector.getAllAndOverride<boolean>(AUTH_OPTIONAL, targets);
    const isAdminRoute = request.path.toLowerCase().startsWith('/admin');

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const hasToken = type === 'Bearer' && !!token;

    if (!authRequired && !isAdminRoute) {
      if (authOptional && hasToken) {
        request.user = await this.verify(token).catch(() => undefined);
      }
      return true;
    }

    if (!hasToken) throw new UnauthorizedException('Token is missing');
    const payload = await this.verify(token);
    request.user = payload;

    if (isAdminRoute && !payload.isAdmin) {
      throw new ForbiddenException('Admin only');
    }
    return true;
  }

  private async verify(token: string): Promise<TokenPayload> {
    try {
      return await this.jwtService.verifyAsync<TokenPayload>(token);
    } catch {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}
