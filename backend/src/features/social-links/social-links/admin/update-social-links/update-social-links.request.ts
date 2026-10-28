import { PartialType } from '@nestjs/swagger';
import { CreateSocialLinksRequest } from '../create-social-links/create-social-links.request';

export class UpdateSocialLinksRequest extends PartialType(CreateSocialLinksRequest) {}
