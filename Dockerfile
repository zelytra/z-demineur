FROM node:latest as build-stage
WORKDIR /app
RUN npm install
CMD ["npm", "run", "dev"]

FROM nginx as production-stage
RUN mkdir /app
EXPOSE 80
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
