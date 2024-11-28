# Basic DockerFile to run a node application

# Node version 20
FROM node:lts

# Path in the container where the application files will go
WORKDIR /usr/src/app

# Copy in the package files and install required packages
COPY /package*.json ./
RUN npm install

# Copy our app source tree into the working directory
COPY . .

EXPOSE 3000
# Command to execute when the container starts
CMD [ "npm", "run", "dev" ]