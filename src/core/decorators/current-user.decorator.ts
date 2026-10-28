import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class TokenPayload {
  sub: number;
  isAdmin: boolean;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): TokenPayload | undefined =>
    context.switchToHttp().getRequest().user,
);
