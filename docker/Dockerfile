# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /retail-pulse-backend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY  ./retail-pulse-backend/ ./

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npx", "ts-node", "src/server.ts"]
