FROM node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

ENV PORT 8080
ENV ENDPOINT /

CMD [ "node", "index.js" ]
