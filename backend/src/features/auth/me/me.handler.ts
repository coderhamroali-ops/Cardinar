import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class MeHandler {
  async execute(userId: number) {
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }
}
