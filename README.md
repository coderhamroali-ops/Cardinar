# Cardinar.uz — Backend

Avtochexollar, poliklar va torpedo nakidkalari internet-do'koni uchun backend.
Katalog, filtrlar, savat, buyurtmalar, filiallar, arizalar va chexol/polik konstruktorini bitta API orqali beradi.

## Texnologiyalar

- **NestJS 11** (TypeScript)
- **PostgreSQL** + **TypeORM** — migratsiyalar bilan
- **JWT** autentifikatsiya, **bcrypt**
- **Swagger** — `http://localhost:4000/swagger`

## Tuzilish

```
src/
  core/        # BaseModel, enumlar, AuthGuard, umumiy admin CRUD, pagination
  features/
    site/          # staticInfo (singleton), banners, phoneNumbers, socialLinks
    users/         # auth: register, login, me + admin/users
    branches/      # "Где купить?" — rasmiy do'konlar va hamkorlar
    requests/      # "Нужна помощь", "Контакты", "Купить в один клик" arizalari
    catalog/       # colors, carMakes, carModels, categories, products, images, articuls
    cart/          # foydalanuvchi savati
    orders/        # checkout va buyurtmalar tarixi
    constructor/   # materials, customModels, parts, customProducts
    uploads/       # admin rasm yuklash
  seed/        # Figma dizaynidagi ma'lumotlar
  migrations/
```

## Ruxsatlar

| Yo'l | Kim uchun |
|---|---|
| `/public/*`, `/auth/register`, `/auth/login` | hamma |
| `/cart/*`, `/orders/*`, `/auth/me` | tizimga kirgan foydalanuvchi |
| `/admin/*` | faqat `isAdmin = true` |

Har bir jadval uchun admin CRUD: `GET /admin/<nom>`, `GET/PATCH/DELETE /admin/<nom>/:id`, `POST /admin/<nom>`.

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
