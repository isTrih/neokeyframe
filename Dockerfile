FROM node:22-alpine
WORKDIR /app

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NUXT_PUBLIC_BASE_URL=/proapi

COPY .output/ /app
EXPOSE 3000

CMD ["node", "server/index.mjs"]