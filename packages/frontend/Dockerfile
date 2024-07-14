# Use latest LTS Node.js image as the base image
FROM node:20.10 as frontend

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y iproute2

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

