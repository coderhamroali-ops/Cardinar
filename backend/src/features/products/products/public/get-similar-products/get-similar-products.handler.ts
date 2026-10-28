import { Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';
import { ProductEntity } from '../../../entities/product.entity';
import { loadProductCards } from '../load-product-cards';

// "Похожие товары": shu kategoriyadagi boshqa mahsulotlar
@Injectable()
export class GetSimilarProductsPublicHandler {
  async execute(id: number) {
    const product = await ProductEntity.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    const similar = await ProductEntity.find({
      select: { id: true },
      where: { categoryId: product.categoryId, id: Not(id) },
      order: { id: 'DESC' },
      take: 8,
    });
    return loadProductCards(similar.map((p) => p.id));
  }
}
