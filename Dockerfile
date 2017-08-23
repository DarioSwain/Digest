FROM node:8.4-alpine as frontend-builder
WORKDIR /var/www/app
RUN npm install -g @angular/cli
COPY src-web .
RUN npm install && ng build --env=prod

FROM composer:latest as backend-builder
WORKDIR /var/www/app
COPY composer.json composer.lock ./
RUN composer install --ignore-platform-reqs --no-scripts --no-autoloader

FROM php:7.1-fpm-alpine
RUN apk --no-cache add ca-certificates
WORKDIR /var/www/digest
COPY . .
COPY --from=backend-builder /var/www/app/vendor ./vendor
COPY --from=frontend-builder /var/www/app/dist ./web/public
RUN mkdir -p /etc/nginx/conf.d && cp ./docker/nginx.conf /etc/nginx/conf.d/digest.conf
VOLUME /var/www/digest
