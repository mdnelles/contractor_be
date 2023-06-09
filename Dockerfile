
FROM node:18

ENV NODE_ENV=production

WORKDIR /app

# ["<src>", "<dest>"]
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 5020 3306 3307

COPY . .

CMD ["npm", "run", "dockerize"]
