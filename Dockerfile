FROM node:8.4 as frontend-builder
WORKDIR /var/www/app
COPY src-web .
RUN npm install && ./node_modules/.bin/ng build --env=prod

FROM composer:latest as backend-builder
WORKDIR /var/www/app
COPY . .
RUN rm -rf /var/www/app/var/logs/* /var/www/app/var/cache/* /var/www/app/var/sessions/*
RUN composer install --optimize-autoloader --ignore-platform-reqs --no-interaction

FROM php:7.1-fpm
RUN apt-get update && apt-get install -y \
        wget \
        curl \
        libicu-dev \
        libmcrypt-dev \
        libz-dev \
        libcurl4-openssl-dev \
        pkg-config \
        libssl-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install -j$(nproc) zip intl mcrypt curl opcache pcntl \
    && pecl install \
        mongodb \
    && docker-php-ext-enable \
        mongodb
WORKDIR /var/www/digest
COPY . .
COPY --from=backend-builder /var/www/app/vendor ./vendor
COPY --from=backend-builder /var/www/app/app/config/parameters.yml ./app/config/parameters.yml
COPY --from=frontend-builder /var/www/app/dist ./web/public
RUN chmod 777 -R var/logs var/cache var/sessions
RUN mkdir -p /etc/nginx/conf.d && cp ./docker/nginx.conf /etc/nginx/conf.d/digest.conf
VOLUME /var/www/digest
