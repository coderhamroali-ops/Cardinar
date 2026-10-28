# Cardinar.uz

Avtochexollar, poliklar va torpedo nakidkalari internet-do'koni — Figma dizayni asosida
qilingan to'liq (full-stack) loyiha.

| Papka | Texnologiyalar |
|---|---|
| [`backend/`](backend) | NestJS 11, PostgreSQL, TypeORM, JWT, Swagger — Vertical Slice arxitekturasi |
| [`frontend/`](frontend) | Next.js 16, React 19, Tailwind CSS 4 |

## Imkoniyatlar

- Katalog: kategoriya, rang, avtomobil markasi/modeli, narx bo'yicha filtr, qidiruv, pagination
- Mahsulot sahifasi: avtomobil modelini tanlash, savat, "Купить в один клик"
- Chexol va polik konstruktori: rang va material tanlash, JPG saqlash, ariza qoldirish
- Savat (mehmon uchun ham), checkout, buyurtmalar tarixi
- "Где купить?" — do'konlar va hamkorlar xaritada
- Admin API: har bir jadval uchun CRUD va rasm yuklash

## Ishga tushirish

```bash
# Backend — http://localhost:4000, Swagger: /swagger
cd backend
cp .env.example .env
npm install
npm run migrate
npm run seed
npm run start:dev
```

```bash
# Frontend — http://localhost:3001
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Batafsil: [backend/README.md](backend/README.md), [frontend/README.md](frontend/README.md).
