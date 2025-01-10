# Use an latest Node.js runtime as a parent image
FROM node:22.12-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the application code
COPY . .

# Install dependencies
RUN npm install

# Define the command to run the app
CMD npm start