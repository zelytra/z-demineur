FROM node:latest as build-stage
WORKDIR /app
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
EXPOSE 80
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
