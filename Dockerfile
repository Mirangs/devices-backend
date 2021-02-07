FROM node:14.15.3-alpine3.12@sha256:db383f8332e0d50467ce9b9ca0b462dcb413d9c99abf18c15e29d4b584ba8996

WORKDIR /usr/app

COPY . .
COPY ./package.json ./package.json

RUN yarn

CMD [ "yarn", "dev" ]