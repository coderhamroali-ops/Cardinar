import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { PhoneNumberEntity } from '../../../entities/phone-number.entity';
import { GetAllPhoneNumbersRequest } from './get-all-phone-numbers.request';

@Injectable()
export class GetAllPhoneNumbersHandler {
  async execute(query: GetAllPhoneNumbersRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await PhoneNumberEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
