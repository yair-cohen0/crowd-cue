FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

# Copy root package.json and lockfile
COPY package**.json ./

# Copy each app or package package.json and lockfile
COPY apps/client/package**.json ./apps/client/
COPY apps/server/package**.json ./apps/server/
COPY packages/types/package**.json ./packages/types/

RUN npm ci

COPY . .

RUN npm run build

FROM base AS prune

WORKDIR /app

RUN apk update
RUN apk add --no-cache libc6-compat

RUN npm i -g turbo@^2.0.9

COPY . .

RUN turbo prune server --docker

FROM base AS runner

WORKDIR /app

COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/package-lock.json ./package-lock.json

RUN npm ci

COPY --from=builder app/apps/server/dist ./
COPY --from=builder app/apps/client/dist ./static


EXPOSE 3000

CMD ["node", "main"]
