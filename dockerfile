FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 5003

CMD ["npm", "run", "dev"]
