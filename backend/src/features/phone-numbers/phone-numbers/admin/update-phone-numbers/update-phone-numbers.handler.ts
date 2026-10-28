import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { PhoneNumberEntity } from '../../../entities/phone-number.entity';
import { UpdatePhoneNumbersRequest } from './update-phone-numbers.request';

@Injectable()
export class UpdatePhoneNumbersHandler {
  async execute(id: number, payload: UpdatePhoneNumbersRequest) {
    const item = await PhoneNumberEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('PhoneNumbers not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
