FROM node:24-slim AS build
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates unzip \
  && rm -rf /var/lib/apt/lists/*


ENV BUN_INSTALL=/usr/local/bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

COPY package.json bun.lock ./

RUN bun install

COPY astro.config.mjs tsconfig.json prisma.config.ts ./
COPY src/ ./src/
COPY public/ ./public/
COPY prisma/ ./prisma/

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG NEWSAPI_API_KEY
ENV NEWSAPI_API_KEY=$NEWSAPI_API_KEY

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

RUN bunx prisma generate

RUN bunx astro build

FROM node:24.0 AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json ./

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["node", "dist/server/entry.mjs"]