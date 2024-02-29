FROM node:20.11.0-alpine3.18 AS development
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build