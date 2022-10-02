FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "dev -- --host --port 80"]

FROM nginx as production-stage
RUN mkdir /app
EXPOSE 80
#COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
