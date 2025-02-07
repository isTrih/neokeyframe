FROM node:22-alpine

COPY [".output", "."]

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NUXT_PUBLIC_BASE_URL=/proapi

EXPOSE 3000

ENTRYPOINT ["node", "server/index.mjs"]