# Cardinar.uz — Frontend

Figma dizayni asosida qilingan avtochexol va poliklar internet-do'koni.

## Texnologiyalar

- **Next.js 16** (App Router), **React 19**
- **Tailwind CSS 4**
- Backend: [cardinar-bekend](../cardinar-bekend)

## Sahifalar

| Yo'l | Figma ekrani |
|---|---|
| `/` | главная — hero, promo bloklar, mashhur va premium mahsulotlar |
| `/shop` | Product shop — filtr paneli, pagination, qidiruv |
| `/product/[id]` | Product detail — galereya, avtomobil modeli, "Купить в один клик" |
| `/konstruktor/cover`, `/konstruktor/carpet` | constructor — rang va material tanlash, JPG saqlash, ariza |
| `/branches` | Где купить? — do'konlar jadvali va xarita |
| `/contacts` | Contact Us |
| `/login`, `/register`, `/logout` | authorization, registration, exit |
| `/orders` | History of orders |
| `/checkout` | checkout |

Savat o'ngdan chiqadigan panelda. Mehmon savati `localStorage`da saqlanadi va tizimga kirgach serverga ko'chiriladi.

## Ishga tushirish

```bash
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:4000
npm install
npm run dev                  # http://localhost:3001
```
