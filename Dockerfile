FROM node:10

LABEL maintainer="palash.kondekar@sap.com"

WORKDIR usr/src/app

COPY . ./usr/src/app

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]

