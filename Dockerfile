FROM node:14.4.0-buster-slim

ARG CB_AUTH
ENV CB_BASIC_AUTH=$CB_AUTH

WORKDIR /usr/src/app

###########################################################
# Setup
###########################################################

COPY . .

RUN npm ci --only=production
RUN npm install rollup

###########################################################
# Build
###########################################################

RUN npm run build

###########################################################
# Clean Up
###########################################################

RUN rm -rf src \
           .gitignore \
           log.txt \
           rollup.config.js \
           chatbot
# node_modules \

###########################################################
# Configure
###########################################################

EXPOSE 8080
CMD [ "node", "server.js" ]
