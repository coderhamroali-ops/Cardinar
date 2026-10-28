import { SetMetadata } from '@nestjs/common';

// Tizimga kirgan foydalanuvchi talab qilinadigan endpointlar uchun
export const AUTH_REQUIRED = 'authRequired';
export const Auth = () => SetMetadata(AUTH_REQUIRED, true);

// Token bo'lsa o'qiladi, bo'lmasa ham so'rov o'tadi (masalan, mehmon ariza qoldirishi)
export const AUTH_OPTIONAL = 'authOptional';
export const OptionalAuth = () => SetMetadata(AUTH_OPTIONAL, true);
