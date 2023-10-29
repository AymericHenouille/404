FROM node:20 as build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.25.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html
