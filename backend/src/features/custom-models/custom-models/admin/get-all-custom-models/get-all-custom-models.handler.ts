import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { CustomModelEntity } from '../../../entities/custom-model.entity';
import { GetAllCustomModelsRequest } from './get-all-custom-models.request';

@Injectable()
export class GetAllCustomModelsHandler {
  async execute(query: GetAllCustomModelsRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await CustomModelEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
