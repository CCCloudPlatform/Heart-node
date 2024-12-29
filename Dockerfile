FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:main

FROM node:20-alpine

WORKDIR /app

COPY .env.local ./.env.local

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

CMD [ "npm", "run", "start:local" ]