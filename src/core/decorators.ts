import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export class TokenPayload {
  sub: number;
  isAdmin: boolean;
}

// Tizimga kirgan foydalanuvchi talab qilinadigan endpointlar uchun
export const AUTH_REQUIRED = 'authRequired';
export const Auth = () => SetMetadata(AUTH_REQUIRED, true);

// Token bo'lsa o'qiladi, bo'lmasa ham so'rov o'tadi (masalan, mehmon ariza qoldirishi)
export const AUTH_OPTIONAL = 'authOptional';
export const OptionalAuth = () => SetMetadata(AUTH_OPTIONAL, true);

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): TokenPayload | undefined =>
    context.switchToHttp().getRequest().user,
);
