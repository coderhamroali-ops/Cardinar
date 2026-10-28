import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { UserEntity } from '../../../entities/user.entity';
import { GetAllUsersRequest } from './get-all-users.request';

@Injectable()
export class GetAllUsersHandler {
  async execute(query: GetAllUsersRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await UserEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
