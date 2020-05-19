FROM node:latest

# use 'ENV VAR=Value \' for env variables

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 8080

CMD npm start