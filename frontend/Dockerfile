FROM node:17-alpine

WORKDIR /frontend

COPY package.json .
COPY .env .
COPY cert.pem .
COPY key.pem .

RUN npm install

COPY . .

CMD ["npm", "start"]