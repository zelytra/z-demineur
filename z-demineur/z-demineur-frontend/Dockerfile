# Stage 1: Build the Node.js application
FROM node:latest AS build-stage
ARG VERSION=0.0.0
ENV VERSION=$VERSION
ENV NODE_OPTIONS="--max_old_space_size=8192"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json .

RUN npm install
# Copy the rest of the application
COPY . .

# Set app version
RUN npm version ${VERSION}

# Build the project
RUN npm run build

# Stage 2: Use the unprivileged Nginx image
FROM nginxinc/nginx-unprivileged:stable-alpine

# Switch to root user to perform privileged operations
USER root

# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Create a directory for the PID file and set ownership
RUN mkdir -p /var/run/nginx && \
    chown nginx:nginx /var/run/nginx

# Remove default nginx index page
RUN rm -rf /tmp/html/*

# Copy built application from the build-stage and set ownership
COPY --from=build-stage /app/dist /tmp/html

# Ensure ownership and permissions are correct
RUN chown -R nginx:nginx /tmp/html && \
    chmod -R 777 /tmp/html

# Copy the environment runtime editor script
COPY ./env_runtime_editor.sh /env_runtime_editor.sh
RUN sed -i 's/\r$//' /env_runtime_editor.sh
RUN chmod +x /env_runtime_editor.sh

# Switch back to the non-root user provided by the image
USER nginx

EXPOSE 8080

# Set the entrypoint to the runtime editor script
ENTRYPOINT ["/env_runtime_editor.sh"]