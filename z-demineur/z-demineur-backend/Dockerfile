FROM node:12-alpine

# Create app directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Create a non-root user and group
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

# Change ownership of the app directory
RUN chown -R nodeapp:nodeapp /app

# Switch to the non-root user
USER nodeapp

# Expose the app port
EXPOSE 8080

# Run the app
CMD ["npm", "start"]
