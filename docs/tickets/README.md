# WebShop — Toteutustiketit

> **Filosofia:** Yksi tiketti = yksi atominen muutos. Jokainen tiketti on itsenäisesti toteutettavissa ja testattavissa. Järjestys on dependency-järjestys — älä hyppää eteenpäin ennen kuin edellinen on valmis.

## Stack

| Kerros | Teknologia |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| Kieli | TypeScript 5.x (strict) |
| UI | Tailwind CSS v4 + shadcn/ui + Framer Motion |
| Tietokanta | PostgreSQL (Supabase) + Prisma ORM + pgvector |
| Auth | NextAuth.js v5 (Google OAuth + Credentials) |
| Maksut | Stripe Checkout (hosted) |
| AI | OpenAI text-embedding-3-small + RAG |
| State | Zustand (cart, theme, UI) |
| Validointi | Zod |
| Testaus | Vitest + Playwright |
| Hosting | Vercel |

## Riippuvuuskaavio

```
WS-000 (Next.js scaffold)
  └── WS-001 (Prisma schema + migraatio)
        ├── WS-002 (TypeScript-tyypit)
        ├── WS-003 (NextAuth)
        │     └── WS-004 (API-kerros / Server Actions)
        │           ├── WS-005 (Cart store)
        │           └── WS-006 (Theme + UI store)
        │                 └── WS-007 (shadcn/ui)
        │                       ├── WS-008 (ProductCard)
        │                       ├── WS-009 (Navbar)
        │                       ├── WS-010 (CartDrawer)
        │                       └── WS-011 (Footer)
        │                             └── WS-012 (App Router layout + sivut)
        │                                   ├── WS-013 (HomePage)
        │                                   ├── WS-014 (ProductsPage)
        │                                   ├── WS-015 (ProductDetailPage)
        │                                   ├── WS-016 (LoginPage)
        │                                   ├── WS-017 (CheckoutPage)
        │                                   ├── WS-018 (OrdersPage)
        │                                   └── WS-019 (AccountPage)
        ├── WS-020 (Semanttinen haku)
        │     └── WS-021 (RAG-suositukset)
        ├── WS-022 (SEO)
        ├── WS-023 (Testit)
        └── WS-024 (CLAUDE.md)
```

## Tiketit

| # | Tiketti | Vaihe |
|---|---------|-------|
| WS-000 | Next.js 15 -projekti + peruskonfiguraatio | 0 — Scaffold |
| WS-001 | Prisma-skeema ja migraatio | 1 — Tietokanta |
| WS-002 | TypeScript-tyypit (domain model) | 1 — Tietokanta |
| WS-003 | NextAuth.js -konfiguraatio | 2 — Auth |
| WS-004 | API-kerros (Server Actions) | 2 — Auth |
| WS-005 | Zustand cart store | 3 — State |
| WS-006 | Theme store + UI store | 3 — State |
| WS-007 | shadcn/ui -komponenttien asennus | 4 — UI |
| WS-008 | ProductCard-komponentti | 4 — UI |
| WS-009 | Navbar-komponentti | 4 — UI |
| WS-010 | CartDrawer-komponentti | 4 — UI |
| WS-011 | Footer-komponentti | 4 — UI |
| WS-012 | App Router layout + sivupohjat | 5 — Sivut |
| WS-013 | HomePage | 5 — Sivut |
| WS-014 | ProductsPage | 5 — Sivut |
| WS-015 | ProductDetailPage | 5 — Sivut |
| WS-016 | LoginPage | 5 — Sivut |
| WS-017 | CheckoutPage + Stripe | 5 — Sivut |
| WS-018 | OrdersPage | 5 — Sivut |
| WS-019 | AccountPage | 5 — Sivut |
| WS-020 | Semanttinen haku (OpenAI embeddings) | 6 — AI |
| WS-021 | RAG-pohjaiset tuotesuositukset | 6 — AI |
| WS-022 | SEO ja metadata | 7 — Viimeistely |
| WS-023 | E2E-testit (Vitest + Playwright) | 7 — Viimeistely |
| WS-024 | CLAUDE.md päivitys | 7 — Viimeistely |
