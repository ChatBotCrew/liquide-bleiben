FROM node:12-alpine3.10

ARG CB_AUTH
ENV CB_BASIC_AUTH=$CB_AUTH

RUN mkdir /service
WORKDIR /service
COPY . .
RUN npm ci
RUN npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]
