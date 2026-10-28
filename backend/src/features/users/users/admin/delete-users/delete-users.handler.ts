import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../../entities/user.entity';

@Injectable()
export class DeleteUsersHandler {
  async execute(id: number) {
    const item = await UserEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Users not found');
    await item.remove();
    return { id };
  }
}
