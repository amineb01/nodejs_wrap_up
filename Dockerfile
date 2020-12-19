FROM node:10

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm install -g nodemon

RUN ls -l

CMD [ "nodemon", "index.js" ]
