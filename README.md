# Cardinar.uz — Backend

Avtochexollar, poliklar va torpedo nakidkalari internet-do'koni uchun backend.
Katalog, filtrlar, savat, buyurtmalar, filiallar, arizalar va chexol/polik konstruktorini bitta API orqali beradi.

## Texnologiyalar

- **NestJS 11** (TypeScript)
- **PostgreSQL** + **TypeORM** — migratsiyalar bilan
- **JWT** autentifikatsiya, **bcrypt**
- **Swagger** — `http://localhost:4000/swagger`

## Arxitektura — Vertical Slice

Har bir jadval o'z feature papkasida. Feature ichida entity, module va har bir amal
(`create`, `get-all`, `get-one`, `update`, `delete` ...) alohida `handler` va `request` fayli bilan:

```
src/
  core/
    configs/       # swagger, multer
    decorators/    # @Auth, @OptionalAuth, @CurrentUser
    guards/        # AuthGuard: /admin/* — faqat admin, @Auth() — tizimga kirgan foydalanuvchi
    enum/
  features/
    common/        # pagination, paginate(), saveOrConflict(), PHONE_REGEX
    products/
      entities/product.entity.ts
      products.module.ts
      products/
        admin/
          products-admin.controller.ts
          create-products/   create-products.handler.ts, create-products.request.ts
          get-all-products/  get-all-products.handler.ts, get-all-products.request.ts
          get-one-products/  get-one-products.handler.ts
          update-products/   update-products.handler.ts, update-products.request.ts
          delete-products/   delete-products.handler.ts
        public/
          products-public.controller.ts
          get-all-products/      # filtrlar, saralash, pagination
          get-one-product/
          get-similar-products/
    ...                # har bir jadval uchun shunday feature
  seed/                # Figma dizaynidagi ma'lumotlar
  migrations/
```

Featurelar: `auth`, `users`, `site`, `static-info`, `banners`, `phone-numbers`, `social-links`,
`branches`, `requests`, `colors`, `car-makes`, `car-models`, `categories`, `products`,
`product-images`, `articuls`, `product-colors`, `cart`, `orders`, `materials`, `custom-models`,
`parts`, `custom-products`, `uploads`.

## Ruxsatlar

| Yo'l | Kim uchun |
|---|---|
| `/public/*`, `/auth/register`, `/auth/login` | hamma |
| `/cart/*`, `/orders/*`, `/auth/me` | tizimga kirgan foydalanuvchi |
| `/admin/*` | faqat `isAdmin = true` |

Har bir jadval uchun admin CRUD:
`POST /admin/<nom>/create`, `GET /admin/<nom>/list`, `GET /admin/<nom>/:id`,
`PATCH /admin/<nom>/update/:id`, `DELETE /admin/<nom>/delete/:id`.

## Ishga tushirish

```bash
cp .env.example .env   # qiymatlarni to'ldiring
npm install
npm run migrate        # jadvallarni yaratadi
npm run seed           # Figma'dagi ma'lumotlar + admin (ADMIN_EMAIL / ADMIN_PASSWORD)
npm run start:dev
```

API: `http://localhost:4000`, rasmlar: `http://localhost:4000/uploads/...`

## Asosiy endpointlar

- `GET /public/site` — manzil, telefonlar, ijtimoiy tarmoqlar, bannerlar
- `GET /public/products?categoryId=&colorIds=1,2&carMakeId=&carModelId=&minPrice=&maxPrice=&isPremium=&search=&sort=new|price_asc|price_desc&page=&size=`
- `GET /public/products/:id`, `GET /public/products/:id/similar`
- `GET /public/categories`, `/public/colors`, `/public/car-makes` (modellari bilan)
- `GET /public/branches?branchType=official|partner`
- `POST /public/requests`
- `GET /public/constructor?category=cover|carpet`, `POST /public/constructor`
- `GET/POST/PATCH/DELETE /cart`, `POST /orders`, `GET /orders/my`

## DBML sxemasidan farqlar

- `cartItems.userId` qo'shildi — savat foydalanuvchiga bog'lanadi (Figma'dagi "Выход" sahifasi: savat keyingi kirishda tiklanadi).
- `orderItems.price` qo'shildi — buyurtma paytidagi narx saqlanadi, keyin narx o'zgarsa ham tarix to'g'ri qoladi.
- Hamma jadvalda `createdAt` / `updatedAt` bor (buyurtma sanasi shundan olinadi).
