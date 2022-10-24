FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV=production

RUN tsc

RUN rm -rf ./src

EXPOSE 3000

CMD ["npm","start"]