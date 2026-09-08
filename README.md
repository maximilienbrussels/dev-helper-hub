<div align="center">

# 🚜 Stadsboerderij Maximilien — Platform Architecture

> **Enterprise-grade multi-environment web infrastructure for La Ferme du Parc Maximilien / Stadsboerderij Maximilliaanpark (Quai des Péniches / Schipperijkaai 2, Brussels).**

<p>
  <img alt="Platform Status" src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge" />
  <img alt="Framework" src="https://img.shields.io/badge/Framework-React%2019%20%2B%20Vite%207-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>
<p>
  <img alt="Deployment" src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img alt="Database" src="https://img.shields.io/badge/Database-Neon%20Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Styling-Tailwind%20v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>
<p>
  <img alt="PWA" src="https://img.shields.io/badge/PWA-Offline%20Field%20App-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" />
  <img alt="Architecture" src="https://img.shields.io/badge/Architecture-Single--Repo%20Multi--Target-orange?style=for-the-badge" />
  <img alt="Email" src="https://img.shields.io/badge/Email-Brevo%20Dedicated%20Subdomain-purple?style=for-the-badge" />
</p>

</div>

---

## 🏛 System Architecture Overview

The platform uses a **single GitHub repository** deployed across **three distinct Vercel projects**, conditionally compiling features and UI layers at build time via the `VITE_APP_MODE` environment variable.

One codebase, one database, one identity system — three purpose-built surfaces:

| Tier | Domain | `VITE_APP_MODE` | Audience | Primary purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Public site** | `maximilien.brussels` | `public` | Visitors, neighbours, press | Multilingual storytelling, events, shop, donations |
| **Back office** | `maximilien.site` | `admin` | Coordinators, office team | CRM, planning, finance, content management |
| **Field app** | `maximilien.app` | `field` | Gardeners, volunteers on site | Offline-first PWA: tasks, harvests, logs |

```text
                         ┌──────────────────────────────────────────┐
                         │        Single GitHub repository          │
                         │   (React 19 · Vite 7 · TanStack Start)   │
                         └───────────────────┬──────────────────────┘
                                             │  VITE_APP_MODE
             ┌───────────────────────────────┼───────────────────────────────┐
             ▼                               ▼                               ▼
  ┌────────────────────┐          ┌────────────────────┐          ┌────────────────────┐
  │  PUBLIC  (public)  │          │  ADMIN   (admin)   │          │  FIELD   (field)   │
  │ maximilien.brussels│          │  maximilien.site   │          │  maximilien.app    │
  ├────────────────────┤          ├────────────────────┤          ├────────────────────┤
  │ • NL / FR / EN     │          │ • CRM + members    │          │ • Installable PWA  │
  │ • Events & tickets │          │ • Planning & tasks │          │ • Offline cache    │
  │ • Shop & donations │          │ • Finance / Stripe │          │ • Task check-off   │
  │ • SEO + OG cards   │          │ • Content studio   │          │ • Harvest logging  │
  └─────────┬──────────┘          └─────────┬──────────┘          └─────────┬──────────┘
            │                               │                               │
            └───────────────┬───────────────┴───────────────┬───────────────┘
                            ▼                               ▼
              ┌──────────────────────────┐     ┌──────────────────────────┐
              │  Server functions layer  │     │   Shared session / RBAC  │
              │  (TanStack Start, edge)  │     │  cookies · roles · perms │
              └────────────┬─────────────┘     └────────────┬─────────────┘
                           └───────────────┬────────────────┘
                                           ▼
            ╔══════════════════════════════════════════════════════════╗
            ║              UNIFIED DATABASE CORE — Neon Postgres        ║
            ║  users · roles · members · events · tasks · harvests ·    ║
            ║  orders · invoices · media · audit log   (37 migrations)  ║
            ╚═══════════════════════┬══════════════════════════════════╝
                                    │
        ┌───────────────┬───────────┴───────────┬───────────────┐
        ▼               ▼                       ▼               ▼
   ┌──────────┐   ┌────────────┐          ┌──────────┐   ┌────────────┐
   │  Stripe  │   │  S3 object │          │  Brevo   │   │  Bluesky   │
   │ payments │   │  storage   │          │  e-mail  │   │  social    │
   └──────────┘   └────────────┘          └──────────┘   └────────────┘
```

---

## ⚙️ Build Matrix

| Target | Command | Output domain |
| :--- | :--- | :--- |
| Public site | `VITE_APP_MODE=public bun run build` | `maximilien.brussels` |
| Back office | `VITE_APP_MODE=admin bun run build` | `maximilien.site` |
| Field app (PWA) | `VITE_APP_MODE=field bun run build` | `maximilien.app` |

Without `VITE_APP_MODE` (local dev or preview) the hostname decides, with
`?mode=public`, `?mode=admin` or `?mode=field` as a manual override.

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev          # http://localhost:8080
```

| Script | Purpose |
| :--- | :--- |
| `bun run dev` | Local dev server with HMR |
| `bun run build` | Production build |
| `bun run build:dev` | Development-mode build (prerender sanity check) |
| `bun run preview` | Serve the built output |
| `bun run lint` | ESLint across the repo |
| `bun run test` | Vitest suite |
| `bun run format` | Prettier write |

---

## 🧱 Technology Stack

| Layer | Technology |
| :--- | :--- |
| UI | React 19, TanStack Router/Start, Radix UI, shadcn-style components |
| Styling | Tailwind CSS v4 (native `@theme` tokens in `src/styles.css`) |
| Build | Vite 7, manual chunk groups (`vendor-pdf`, `vendor-charts`, `vendor-react`, `portal`) |
| Server | TanStack Start server functions, edge runtime |
| Database | Neon serverless Postgres — 37 SQL migrations in `neon/migrations/` |
| Auth | Custom session auth + WebAuthn passkeys, Google OAuth, role-based permissions |
| Payments | Stripe (checkout, webhooks, invoices) |
| Storage | S3-compatible object storage (Scaleway) with presigned uploads |
| E-mail | Brevo / SMTP on a dedicated sending subdomain |
| Calendar | FullCalendar (day, week, list, interaction) |

---

## 🔐 Access & Identity

A **single shared access-control model** spans all three environments: whoever may
work on `maximilien.site` also enters `maximilien.app` with the same role and the
same permissions. Menu entries and field-app tabs are filtered per permission, so
the interface only shows what the signed-in person is allowed to do.

| Concern | Detail |
| :--- | :--- |
| Session | HTTP-only cookie, verified server-side on every server function |
| Roles | Stored in a dedicated roles table — never on the profile record |
| Passkeys | WebAuthn registration and login via SimpleWebAuthn |
| OAuth | Google sign-in, origins allow-listed per domain |

---

## 🔑 Required Environment Variables

| Variable | Used for |
| :--- | :--- |
| `DATABASE_URL` | Neon Postgres connection string |
| `SMTP_HOST` · `SMTP_PORT` · `SMTP_USER` · `SMTP_PASS` · `SMTP_FROM` | Transactional e-mail |
| `S3_ACCESS_KEY` · `S3_SECRET_KEY` · `S3_ENDPOINT` · `S3_BUCKET` · `S3_REGION` | Media and document storage |
| `STRIPE_PUBLISHABLE_KEY` · `STRIPE_SECRET_KEY` · `STRIPE_WEBHOOK_SECRET` | Payments and webhooks |
| `GOOGLE_CLIENT_ID` · `GOOGLE_CLIENT_SECRET` | Google sign-in |
| `BSKY_IDENTIFIER` · `BSKY_APP_PASSWORD` | Bluesky social publishing |
| `OAUTH_ALLOWED_ORIGINS` · `PUBLIC_SITE_ORIGIN` | Cross-domain session and redirect safety |

> ⚠️ All three domains must appear in `OAUTH_ALLOWED_ORIGINS`, `PUBLIC_SITE_ORIGIN`
> and the CORS origins of the S3 bucket — otherwise sessions or uploads break.

---

## 🗂 Repository Layout

```text
src/
├── routes/            File-based routes (public, portal, field, api)
│   └── api/public/    Webhooks & external endpoints (signature-verified)
├── components/
│   ├── portal/        Back-office shell, navigation, pages
│   ├── pwa/           Install prompt & offline helpers
│   └── ui/            Design-system primitives
├── lib/               Server functions, auth, i18n, storage, integrations
└── styles.css         Tailwind v4 theme tokens
neon/
├── migrations/        37 ordered SQL migrations
└── seed/              Reference and demo data
public/                Static assets, manifest, icons
tests/                 Vitest suites
```

---

## 🚀 Deployment

Each Vercel project points at the same repository and differs only by its
`VITE_APP_MODE` value and its custom domain. Push to `main` and all three
targets rebuild from the identical commit, guaranteeing that the public site,
the back office and the field app never drift apart.

| Vercel project | Env | Domain |
| :--- | :--- | :--- |
| `maximilien-public` | `VITE_APP_MODE=public` | `maximilien.brussels` |
| `maximilien-admin` | `VITE_APP_MODE=admin` | `maximilien.site` |
| `maximilien-field` | `VITE_APP_MODE=field` | `maximilien.app` |

---

<div align="center">

**Stadsboerderij Maximilien / La Ferme du Parc Maximilien**
Quai des Péniches 2 · Schipperijkaai 2 · 1000 Brussels

</div>
