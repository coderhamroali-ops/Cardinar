import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { ProductEntity } from '../../../entities/product.entity';
import { loadProductCards } from '../load-product-cards';
import { GetAllProductsPublicRequest } from './get-all-products.request';

const ORDER = {
  new: ['product.id', 'DESC'],
  price_asc: ['product.price', 'ASC'],
  price_desc: ['product.price', 'DESC'],
} as const;

@Injectable()
export class GetAllProductsPublicHandler {
  async execute(filter: GetAllProductsPublicRequest) {
    const page = filter.page ?? 1;
    const size = filter.size ?? 12;
    const query = ProductEntity.createQueryBuilder('product');

    if (filter.categoryId) query.andWhere('product.categoryId = :categoryId', { categoryId: filter.categoryId });
    if (filter.status) query.andWhere('product.status = :status', { status: filter.status });
    if (filter.isPremium !== undefined) query.andWhere('product.isPremium = :isPremium', { isPremium: filter.isPremium });
    if (filter.minPrice !== undefined) query.andWhere('product.price >= :minPrice', { minPrice: filter.minPrice });
    if (filter.maxPrice !== undefined) query.andWhere('product.price <= :maxPrice', { maxPrice: filter.maxPrice });
    if (filter.search) query.andWhere('product.title ILIKE :search', { search: `%${filter.search}%` });
    if (filter.colorIds?.length) {
      query.andWhere(
        'EXISTS (SELECT 1 FROM "productColors" pc WHERE pc."productId" = product.id AND pc."colorId" IN (:...colorIds))',
        { colorIds: filter.colorIds },
      );
    }
    if (filter.carModelId || filter.carMakeId) {
      query.andWhere(
        `EXISTS (SELECT 1 FROM articuls a JOIN "carModels" m ON m.id = a."carModelId"
          WHERE a."productId" = product.id
          ${filter.carModelId ? 'AND m.id = :carModelId' : ''}
          ${filter.carMakeId ? 'AND m."carMakeId" = :carMakeId' : ''})`,
        { carModelId: filter.carModelId, carMakeId: filter.carMakeId },
      );
    }

    const [field, direction] = ORDER[filter.sort ?? 'new'];
    query.orderBy(field, direction).addOrderBy('product.id', 'DESC');

    // 1-bosqich: filtr va sahifa bo'yicha faqat id'lar (join'lar sanoqni buzmasligi uchun)
    const total = await query.getCount();
    const rows = await query.select('product.id', 'id').offset((page - 1) * size).limit(size).getRawMany<{ id: number }>();

    // 2-bosqich: shu mahsulotlar rasmlari va artikullari bilan
    const data = await loadProductCards(rows.map((row) => Number(row.id)));
    return paginate(data, total, page, size);
  }
}
