import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { CarModelEntity } from '../../../../car-models/entities/car-model.entity';
import { CustomModelEntity } from '../../../../custom-models/entities/custom-model.entity';
import { CustomProductEntity } from '../../../entities/custom-product.entity';
import { CreateCustomProductRequest } from './create-custom-product.request';

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

// "Оставить заявку": konstruktorda yig'ilgan rasm bilan ariza
@Injectable()
export class CreateCustomProductHandler {
  async execute(payload: CreateCustomProductRequest) {
    const model = await CustomModelEntity.findOneBy({ id: payload.modelId, category: payload.category });
    if (!model) throw new BadRequestException('Model not found');
    const carModel = await CarModelEntity.findOneBy({ id: payload.carModelId, carMakeId: payload.carMakeId });
    if (!carModel) throw new BadRequestException('Car model does not belong to this make');

    const product = await CustomProductEntity.create({ ...payload, image: this.saveImage(payload.image) }).save();
    return { id: product.id };
  }

  private saveImage(dataUrl: string): string {
    const match = /^data:image\/(jpeg|png);base64,(.+)$/.exec(dataUrl);
    if (!match) throw new BadRequestException('Image must be a JPEG or PNG data URL');
    const buffer = Buffer.from(match[2], 'base64');
    if (buffer.length > MAX_IMAGE_BYTES) throw new BadRequestException('Image is too large');

    const dir = path.join(process.cwd(), 'uploads', 'custom');
    fs.mkdirSync(dir, { recursive: true });
    const fileName = `${randomUUID()}.${match[1] === 'jpeg' ? 'jpg' : 'png'}`;
    fs.writeFileSync(path.join(dir, fileName), buffer);
    return `uploads/custom/${fileName}`;
  }
}
