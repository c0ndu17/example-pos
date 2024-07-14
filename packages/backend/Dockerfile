# Use latest LTS Node.js image as the base image
FROM node:20.10 as backend

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]

