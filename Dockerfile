# Set base image with pnpm installed
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies separately to leverage caching
FROM base AS deps
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM deps AS server-builder
WORKDIR /usr/src/app
RUN pnpm run build --filter=server
RUN pnpm deploy --filter=server --prod /prod/server

FROM deps AS web-builder
WORKDIR /usr/src/app
RUN pnpm run build --filter=web
COPY ./apps/web/.next/standalone /prod/web/
COPY ./apps/web/.next/static /prod/web/apps/web/.next/static

FROM base AS server
COPY --from=server-builder /prod/server/node_modules /prod/server/node_modules
COPY --from=server-builder /prod/server/dist /prod/server/dist
COPY --from=server-builder /prod/server/package.json /prod/server/package.json
WORKDIR /prod/server
EXPOSE 3001
CMD [ "pnpm", "start" ]

FROM base AS web
COPY --from=web-builder /prod/web /prod/web
WORKDIR /prod/web
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000
CMD [ "node", "apps/web/server.js" ]
