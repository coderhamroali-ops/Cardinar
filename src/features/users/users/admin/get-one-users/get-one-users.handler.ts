import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../../entities/user.entity';

@Injectable()
export class GetOneUsersHandler {
  async execute(id: number) {
    const item = await UserEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Users not found');
    return item;
  }
}
