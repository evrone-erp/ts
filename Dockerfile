FROM node:18 AS base

FROM base AS deps

ARG GA_NPM_TOKEN
WORKDIR /deps

COPY .npmrc package*.json ./
RUN npm ci

FROM base AS build

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /build

COPY --from=deps /deps/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS application

WORKDIR /app

RUN apt-get update \
	&& apt-get install --no-install-recommends --no-install-suggests -y \
	jq \
	&& apt-get remove --purge --auto-remove -y && rm -rf /var/lib/apt/lists/* /etc/apt/sources.list.d/*

COPY --from=build /build/next.config.js ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json ./package.json
COPY --from=build /build/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

FROM application AS development

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "dev"]

FROM application AS production

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "start"]
