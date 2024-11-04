FROM node:20.18.0-slim

WORKDIR /app

COPY prisma ./prisma/
COPY package*.json .

RUN npm ci
RUN apt-get update -y && apt-get install -y openssl

COPY . .

RUN npm run build
RUN chmod +x /app/entrypoint.sh

USER root

ENTRYPOINT ["/app/entrypoint.sh"]