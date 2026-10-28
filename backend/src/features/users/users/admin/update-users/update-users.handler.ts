import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { UserEntity } from '../../../entities/user.entity';
import { UpdateUsersRequest } from './update-users.request';

@Injectable()
export class UpdateUsersHandler {
  async execute(id: number, payload: UpdateUsersRequest) {
    const item = await UserEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Users not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
