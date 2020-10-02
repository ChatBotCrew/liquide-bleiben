FROM node:lts-alpine

ARG CB_AUTH
ENV CB_BASIC_AUTH=$CB_AUTH

WORKDIR /app
COPY . .

RUN npm install ; \
    cd liquid-client ; \
    npm install ; \
    npm run build ;

WORKDIR /app



EXPOSE 8080
CMD [ "node", "server.js" ]
