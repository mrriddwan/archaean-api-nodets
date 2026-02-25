FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Prisma 7 env() requires DATABASE_URL at generate time
# Dummy value is safe — generate only reads schema, never connects to DB
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" \
    npx prisma generate

RUN pnpm run build

# ── Production stage ──────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY prisma.config.js ./prisma.config.js
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000
CMD ["node", "dist/src/server.js"]