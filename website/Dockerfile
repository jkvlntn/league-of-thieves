# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

# -------- Install dependencies --------
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# -------- Build application and generate Prisma client --------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG DIRECT_URL
ENV DIRECT_URL=${DIRECT_URL}

# Generate Prisma client for alpine (musl) builds
RUN npx prisma db push --accept-data-loss

# Build Next.js app
RUN npm run build

# -------- Production image --------
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
