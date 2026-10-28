import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { BranchEntity } from '../../../entities/branch.entity';
import { GetAllBranchesRequest } from './get-all-branches.request';

@Injectable()
export class GetAllBranchesHandler {
  async execute(query: GetAllBranchesRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await BranchEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
