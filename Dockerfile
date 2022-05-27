FROM node:16 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base as production

RUN npm run build

EXPOSE 8080

CMD [ "node", "./build/index.js" ]