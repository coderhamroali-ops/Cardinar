import { In } from 'typeorm';
import { ProductEntity } from '../../entities/product.entity';

// Kartochkalar uchun: rasmlar, kategoriya va artikullar (kartochkadagi "добавить" modelni tanlashni so'raydi).
// id'lar tartibi saqlanadi.
export async function loadProductCards(ids: number[]) {
  if (!ids.length) return [];
  const products = await ProductEntity.find({
    where: { id: In(ids) },
    relations: { images: true, category: true, articuls: { carModel: true } },
    order: { images: { position: 'ASC' }, articuls: { id: 'ASC' } },
  });
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
}
