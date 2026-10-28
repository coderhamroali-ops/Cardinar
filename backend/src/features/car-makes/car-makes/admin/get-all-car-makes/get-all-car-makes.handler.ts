import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { CarMakeEntity } from '../../../entities/car-make.entity';
import { GetAllCarMakesRequest } from './get-all-car-makes.request';

@Injectable()
export class GetAllCarMakesHandler {
  async execute(query: GetAllCarMakesRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await CarMakeEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
