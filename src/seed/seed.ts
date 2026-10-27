import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { BaseEntity, FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../data-source';
import { BranchType, CustomCategory, PartType, ProductStatus } from '../core/enum/enum';
import { BranchEntity } from '../features/branches/branch.entity';
import {
  ArticulEntity,
  CarMakeEntity,
  CarModelEntity,
  CategoryEntity,
  ColorEntity,
  ProductColorEntity,
  ProductEntity,
  ProductImageEntity,
} from '../features/catalog/catalog.entity';
import { CustomModelEntity, MaterialEntity, PartEntity } from '../features/constructor/constructor.entity';
import { BannerEntity, PhoneNumberEntity, SocialLinkEntity, StaticInfoEntity } from '../features/site/site.entity';
import { UserEntity } from '../features/users/user.entity';

// Ma'lumotlar Figma'dagi Cardinar.uz dizaynidan olingan. Rasmlar: uploads/seed/.
// Qayta ishga tushirilsa dublikat yaratmaydi: yozuv topilsa yangilanadi.

type EntityClass<T extends BaseEntity> = { new (): T } & typeof BaseEntity;

async function ensure<T extends BaseEntity>(entity: EntityClass<T>, where: FindOptionsWhere<T>, data: Partial<T> = {}): Promise<T> {
  const repo = AppDataSource.getRepository<T>(entity);
  const existing = await repo.findOne({ where });
  if (existing) return repo.save(repo.merge(existing, data as T));
  return repo.save(repo.create({ ...where, ...data } as T));
}

const IMG = (name: string) => `uploads/seed/${name}.png`;

async function seedSite() {
  const info = (await StaticInfoEntity.findOne({ where: {}, order: { id: 'ASC' } })) ?? StaticInfoEntity.create();
  Object.assign(info, {
    address: 'р-он Мирабадский, ул. Ойбек 24, дом 5',
    phoneNumber: '97-778-99-66',
    workingHours: 'Пн - Вс 9:00 - 19:00',
    email: 'cardinarinfo@gmail.com',
  });
  await info.save();

  for (const value of ['(90) 920 20 20', '(97) 778 99 66', '(99) 084 05 05']) {
    await ensure(PhoneNumberEntity, { value });
  }

  for (const [title, link, icon] of [
    ['Telegram', 'https://t.me/cardinar_uz', 'telegram'],
    ['Facebook', 'https://facebook.com/cardinar.uz', 'facebook'],
    ['Instagram', 'https://instagram.com/cardinar.uz', 'instagram'],
  ]) {
    await ensure(SocialLinkEntity, { link }, { title, icon });
  }

  for (const [title, image] of [
    ['CARDINAR — самая крупная компания в Узбекистане по производству авточехлов', 'hero-seat'],
    ['Чехлы Cardinar Skyline', 'promo-interior'],
    ['Полики Cardinardan Eva', 'promo-mat'],
    ['Накидка на торпеду', 'promo-torpedo'],
  ]) {
    await ensure(BannerEntity, { title }, { image: IMG(image), isActive: true });
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return console.warn('ADMIN_EMAIL / ADMIN_PASSWORD yo\'q, admin yaratilmadi');
  await ensure(UserEntity, { email }, {
    fullName: 'Admin',
    phoneNumber: '+998900000000',
    password: await bcrypt.hash(password, 10),
    isAdmin: true,
  });
}

async function seedColors() {
  // Figma filtridagi 10 ta rang + poliklar uchun ranglar
  const colors = [
    ['Тёмно-серый', '#4A4A4A'], ['Красный', '#E31E24'], ['Серый', '#BDBDBD'], ['Синий', '#2D3CF0'],
    ['Фиолетовый', '#9B4FD1'], ['Графит', '#3B3B3B'], ['Бежевый', '#F1E6D6'], ['Голубой', '#7FB2FF'],
    ['Бордовый', '#8B0F2E'], ['Лавандовый', '#EFE7F7'], ['Чёрный', '#111111'], ['Оранжевый', '#FF5A1F'],
    ['Зелёный', '#2E9E44'], ['Белый', '#FFFFFF'], ['Тёмно-синий', '#24384F'], ['Розовый', '#C2185B'],
  ];
  const result: Record<string, ColorEntity> = {};
  for (const [title, color] of colors) result[title] = await ensure(ColorEntity, { title }, { color });
  return result;
}

async function seedCars() {
  const makes: Record<string, string[]> = {
    Chevrolet: ['Spark', 'Cobalt', 'Lacetti 1', 'Lacetti 2', 'Nexia', 'Malibu'],
    Ravon: ['R2', 'R3', 'R4'],
    Daewoo: ['Matiz', 'Gentra'],
    Kia: ['K5', 'Sportage'],
    Hyundai: ['Sonata', 'Tucson'],
  };
  const models: Record<string, CarModelEntity> = {};
  for (const [makeTitle, modelTitles] of Object.entries(makes)) {
    const make = await ensure(CarMakeEntity, { title: makeTitle });
    for (const title of modelTitles) models[title] = await ensure(CarModelEntity, { title }, { carMakeId: make.id });
  }
  return models;
}

async function seedProducts(colors: Record<string, ColorEntity>, models: Record<string, CarModelEntity>) {
  const covers = await ensure(CategoryEntity, { title: 'Авточехлы' });
  const carpets = await ensure(CategoryEntity, { title: 'Полики' });
  const torpedo = await ensure(CategoryEntity, { title: 'Накидки на торпеду' });

  const gm = ['Nexia', 'Lacetti 1', 'Lacetti 2', 'Spark', 'Cobalt'];
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendum sed.';

  const products = [
    { title: 'Авточехол Cardinar Skyline', category: covers, price: 500000, status: ProductStatus.HIT, images: ['skyline-1', 'skyline-2', 'skyline-3'], colors: ['Чёрный', 'Красный'] },
    { title: 'Авточехол Cardinar Skyline Black', category: covers, price: 500000, status: ProductStatus.NEW, images: ['skyline-black-1', 'skyline-black-2', 'skyline-black-3'], colors: ['Чёрный', 'Тёмно-серый'] },
    { title: 'Авточехол Cardinar Skyline Premium', category: covers, price: 750000, isPremium: true, images: ['premium-1', 'skyline-1'], colors: ['Чёрный', 'Красный'] },
    { title: 'Авточехол Cardinar Skyline Premium Night', category: covers, price: 780000, isPremium: true, images: ['premium-2', 'skyline-3'], colors: ['Чёрный', 'Красный'] },
    { title: 'Авточехол Cardinar Romb', category: covers, price: 550000, status: ProductStatus.HIT, isPremium: true, images: ['romb-1', 'romb-2'], colors: ['Чёрный', 'Графит'] },
    { title: 'Авточехол Cardinar Classic', category: covers, price: 450000, status: ProductStatus.SALE, images: ['classic-1', 'classic-2', 'classic-3'], colors: ['Чёрный', 'Серый'] },
    { title: 'Авточехол Cardinar Polosa', category: covers, price: 480000, images: ['polosa-1', 'polosa-2'], colors: ['Чёрный', 'Бордовый'] },
    { title: 'Авточехол Cardinar Sport', category: covers, price: 520000, status: ProductStatus.NEW, images: ['sport-1', 'sport-2'], colors: ['Чёрный', 'Синий'] },
    { title: 'Авточехол Cardinar Comfort', category: covers, price: 470000, images: ['comfort-1', 'comfort-2'], colors: ['Чёрный', 'Тёмно-серый'] },
    { title: 'Полик Cardinar EVA чёрный', category: carpets, price: 350000, status: ProductStatus.SALE, images: ['eva-black-1', 'eva-black-2'], colors: ['Чёрный'] },
    { title: 'Полик Cardinar EVA синий', category: carpets, price: 350000, images: ['eva-blue'], colors: ['Тёмно-синий'] },
    { title: 'Полик Cardinar EVA оранжевый', category: carpets, price: 350000, status: ProductStatus.NEW, images: ['eva-orange'], colors: ['Оранжевый'] },
    { title: 'Полик Cardinar EVA серый', category: carpets, price: 340000, images: ['eva-gray'], colors: ['Серый'] },
    { title: 'Полик Cardinar 3D', category: carpets, price: 420000, status: ProductStatus.HIT, images: ['mat-3d-1', 'mat-3d-2'], colors: ['Чёрный'] },
    { title: 'Накидка на торпеду из ткани', category: torpedo, price: 250000, status: ProductStatus.NEW, images: ['torpedo-1', 'torpedo-2'], colors: ['Тёмно-синий'] },
    { title: 'Накидка на торпеду Chevrolet Cobalt', category: torpedo, price: 270000, images: ['torpedo-cobalt'], colors: ['Чёрный'] },
  ];

  for (const p of products) {
    const product = await ensure(ProductEntity, { title: p.title }, {
      categoryId: p.category.id,
      price: p.price,
      description: lorem,
      status: p.status ?? undefined,
      isPremium: p.isPremium ?? false,
    });
    for (const [position, image] of p.images.entries()) {
      await ensure(ProductImageEntity, { productId: product.id, position }, { image: IMG(image) });
    }
    for (const color of p.colors) {
      await ensure(ProductColorEntity, { productId: product.id, colorId: colors[color].id });
    }
    for (const model of gm) {
      await ensure(ArticulEntity, { productId: product.id, carModelId: models[model].id });
    }
  }
}

async function seedConstructor(colors: Record<string, ColorEntity>) {
  const materials: Record<string, MaterialEntity> = {};
  for (const [title, description] of [
    ['Экокожа', 'Износостойкая искусственная кожа, легко чистится'],
    ['Алькантара', 'Мягкий замшевый материал, не скользит'],
    ['Жаккард', 'Плотная тканевая основа с узором'],
    ['EVA', 'Ячеистый полимер для автоковриков, не впитывает влагу'],
  ]) {
    materials[title] = await ensure(MaterialEntity, { title }, { description });
  }

  await ensure(CustomModelEntity, { title: 'Классика' }, { category: CustomCategory.COVER, image: IMG('classic-1') });
  await ensure(CustomModelEntity, { title: 'Ромб' }, { category: CustomCategory.COVER, image: IMG('cover-model-gray') });
  await ensure(CustomModelEntity, { title: 'Полоса' }, { category: CustomCategory.COVER, image: IMG('polosa-1') });
  await ensure(CustomModelEntity, { title: 'EVA Ромб' }, { category: CustomCategory.CARPET, image: IMG('carpet-black') });
  await ensure(CustomModelEntity, { title: 'EVA Соты' }, { category: CustomCategory.CARPET, image: IMG('carpet-black-2') });

  // Chexol: markaziy qism rangi tayyor rangli model rasmlari bilan ko'rsatiladi
  const coverCentral: [string, string][] = [
    ['Серый', 'cover-model-gray'], ['Бежевый', 'cover-model-light'], ['Синий', 'cover-model-blue'],
    ['Розовый', 'cover-model-pink'], ['Красный', 'cover-model-red'], ['Зелёный', 'cover-model-green'],
  ];
  for (const [color, image] of coverCentral) {
    await ensure(PartEntity, { category: CustomCategory.COVER, part: PartType.CENTRAL, colorId: colors[color].id }, {
      title: `Центральная вставка — ${color.toLowerCase()}`,
      materialId: materials['Экокожа'].id,
      image: IMG(image),
    });
  }

  // Polik: polik rangi (central) ustiga kant rangi (side) qatlami qo'yiladi — rasmlar bir xil o'lchamda
  const carpetBase: [string, string][] = [
    ['Чёрный', 'carpet-black'], ['Серый', 'carpet-gray'], ['Оранжевый', 'carpet-orange'], ['Тёмно-синий', 'carpet-blue'],
  ];
  for (const [color, image] of carpetBase) {
    await ensure(PartEntity, { category: CustomCategory.CARPET, part: PartType.CENTRAL, colorId: colors[color].id }, {
      title: `Полик — ${color.toLowerCase()}`,
      materialId: materials['EVA'].id,
      image: IMG(image),
    });
  }
  const carpetEdge: [string, string][] = [
    ['Чёрный', 'kant-black'], ['Красный', 'kant-red'], ['Зелёный', 'kant-green'], ['Синий', 'kant-blue'], ['Белый', 'kant-white'],
  ];
  for (const [color, image] of carpetEdge) {
    await ensure(PartEntity, { category: CustomCategory.CARPET, part: PartType.SIDE, colorId: colors[color].id }, {
      title: `Кант — ${color.toLowerCase()}`,
      materialId: materials['EVA'].id,
      image: IMG(image),
    });
  }
}

async function seedBranches() {
  // Figma: "Где купить?" — rasmiy do'konlar va hamkorlar. Koordinatalar shahar markazi bo'yicha taxminiy.
  const branches: [string, string, string | null, string, string, number, number, BranchType][] = [
    ['Farhod Bozori', 'Chilonzor tumani 10 kvartal, 4-uy. Mo\'ljal: "Oqu" restorani', 'Chilonzor', 'Toshkent', '(97) 778 99 66', 41.2856, 69.2034, BranchType.OFFICIAL],
    ['Sergeli', 'Sergeli mashina bozor, dokon 1/3/12', 'Sergeli', 'Toshkent', '(99) 084 05 05', 41.2245, 69.2208, BranchType.OFFICIAL],
    ['Sergeli', 'Sergeli mashina bozor, dokon 3/3/1', 'Sergeli', 'Toshkent', '(99) 865 66 66', 41.2251, 69.2219, BranchType.OFFICIAL],
    ['Carlab', 'Uchqahramon ko\'chasi', 'Yashnobod', 'Toshkent', '99 151 55 55', 41.2995, 69.3311, BranchType.PARTNER],
    ['Car Ero Tuning', 'Birlashgan 1-Tor Ko\'chasi 2-Uy, 19-20-Konadon', 'Yunusobod', 'Toshkent', '95 062 50 50', 41.3672, 69.2884, BranchType.PARTNER],
    ['Xunkar Sound', '17 Kvartal 1-A', 'Yunusobod', 'Toshkent', '98 808 54 54', 41.3575, 69.2876, BranchType.PARTNER],
    ['AutoCity', 'Amir Temur Kochasi 118', 'Yunusobod', 'Toshkent', '91 637 07 77', 41.3401, 69.2849, BranchType.PARTNER],
    ['Avtomakon', 'Buyuk Ipak Yuli 317', 'Mirzo Ulug\'bek Tumani', 'Toshkent', '97 770 77 13', 41.3289, 69.3422, BranchType.PARTNER],
    ['Cardinar', 'Bog\'ishamol 17 uy', 'Bog\'ishamol', 'Andijon', '91 489 01 32', 40.7821, 72.3442, BranchType.PARTNER],
    ['Ayan', 'Damoloq Bozor', '21 MIKRO RAYON', 'Nukus', '90 592 79 98', 42.4602, 59.6166, BranchType.PARTNER],
    ['AMG', 'Nasaf Bozor 140 UY', 'Qarshi', 'Qashqadaryo', '98 777 70 33', 38.8606, 65.7891, BranchType.PARTNER],
    ['Carline', 'Farg\'ona Ko\'cha 1 A UY', 'Farg\'ona', 'Farg\'ona', '98 576 67 67', 40.3864, 71.7864, BranchType.PARTNER],
    ['Cardinar', 'Xorazm Bozor 120 uy', 'Urganch', 'Xorazm', '97 510 64 48', 41.5503, 60.6316, BranchType.PARTNER],
    ['Autotuning_uz', 'Iskandarova 1/4', 'Urganch', 'Xorazm', '90 329 29 69', 41.5534, 60.6249, BranchType.PARTNER],
    ['Formula F1', 'Mustaqillik ko\'chasi 12', 'Samarqand', 'Samarqand', '93 592 32 44', 39.6542, 66.9597, BranchType.PARTNER],
    ['Glamur', 'Navoiy ko\'chasi 45', 'Buxoro', 'Buxoro', '97 708 10 00', 39.7681, 64.4556, BranchType.PARTNER],
    ['Cardinar', 'Alisher Navoiy ko\'chasi 7', 'Namangan', 'Namangan', '91 413 20 20', 40.9983, 71.6726, BranchType.PARTNER],
    ['Forward', 'Nasaf kocha 75 A uy', 'Qarshi', 'Qashqadaryo', '97 971 45 20', 38.8644, 65.7952, BranchType.PARTNER],
  ];
  for (const [title, address, district, region, phoneNumber, latitude, longitude, branchType] of branches) {
    await ensure(BranchEntity, { title, address }, { district: district ?? undefined, region, phoneNumber, latitude, longitude, branchType, isActive: true });
  }
}

async function main() {
  await AppDataSource.initialize();
  try {
    await seedSite();
    await seedAdmin();
    const colors = await seedColors();
    const models = await seedCars();
    await seedProducts(colors, models);
    await seedConstructor(colors);
    await seedBranches();
    console.log('Seed muvaffaqiyatli yakunlandi');
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((err) => {
  console.error('Seed xatosi:', err);
  process.exit(1);
});
