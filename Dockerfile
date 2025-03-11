FROM node:22.14-alpine
WORKDIR /app

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NUXT_PUBLIC_BASE_URL=/proapi

COPY .output/ /app
EXPOSE 3000
RUN ls -l /app
CMD ["node", "server/index.mjs"]