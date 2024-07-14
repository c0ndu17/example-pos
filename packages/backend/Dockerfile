# Use official Node.js image as the base image
FROM node:20.10

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the backend (if applicable)
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]

