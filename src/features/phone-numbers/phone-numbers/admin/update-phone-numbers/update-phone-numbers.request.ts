import { PartialType } from '@nestjs/swagger';
import { CreatePhoneNumbersRequest } from '../create-phone-numbers/create-phone-numbers.request';

export class UpdatePhoneNumbersRequest extends PartialType(CreatePhoneNumbersRequest) {}
