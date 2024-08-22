# node image
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci;

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .

# Copy .env.example to be .env
COPY .env.example .env

RUN npm run build;

# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist dist
COPY --from=builder /app/ecosystem.config.cjs ecosystem.config.cjs

RUN npm install -g pm2

EXPOSE 5173

CMD [ "pm2-runtime", "start", "ecosystem.config.cjs"]