FROM node:alpine3.12

COPY . /usr/src

WORKDIR /usr/src

RUN npm install

EXPOSE 3100

ENTRYPOINT ["npm", "start"]