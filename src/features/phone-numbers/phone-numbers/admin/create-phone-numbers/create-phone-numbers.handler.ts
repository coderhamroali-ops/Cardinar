import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { PhoneNumberEntity } from '../../../entities/phone-number.entity';
import { CreatePhoneNumbersRequest } from './create-phone-numbers.request';

@Injectable()
export class CreatePhoneNumbersHandler {
  async execute(payload: CreatePhoneNumbersRequest) {
    return saveOrConflict(PhoneNumberEntity.create({ ...payload }));
  }
}
