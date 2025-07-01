# Use official Node image
FROM node:20-alpine

# Set working dir
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build your Next.js app
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
