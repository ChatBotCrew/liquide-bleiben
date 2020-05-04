FROM node:12-alpine3.10

ARG CB_AUTH
ENV CB_BASIC_AUTH=$CB_AUTH

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]