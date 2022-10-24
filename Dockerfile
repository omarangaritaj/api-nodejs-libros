FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm","run","start:prod"]