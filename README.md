# Aptos Identity - Monorepo

Demo project for hackathon: SDK de identidad para Aptos con Better Auth, demo web (Next.js) y mobile (Expo).

## Requisitos
- Node 18+
- pnpm

## Setup
1. Copiar `.env.example` a `.env` y completar claves
2. Instalar dependencias
   ```bash
   pnpm install
   ```
3. Levantar API
   ```bash
   pnpm --filter @aptos/identity-api dev
   ```
4. Levantar demo web
   ```bash
   pnpm --filter apps-demo dev
   ```
5. Levantar mobile (expo)
   ```bash
   pnpm --filter apps-mobile start
   ```

## Notas

* Este repo es un **POC/demo**. Nunca usar la derivación determinista de keys en producción.
* Para producción: integrar correctamente Better Auth hosted flows, usar wallets de custodia o key-management seguro y auditar Move modules.
