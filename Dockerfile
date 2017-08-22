FROM node:8.4-alpine as frontend-builder
WORKDIR /var/www/app
RUN npm install -g @angular/cli
COPY src-web .
RUN npm install && ng build --prod --env=prod

FROM composer:latest as backend-builder
WORKDIR /var/www/app
COPY app bin src var web composer.json composer.lock .
RUN composer install --ignore-platform-reqs

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=frontend-builder /var/www/app/dist ./frontend
COPY --from=backend-builder /var/www/app ./backend
#CMD ["./app"]
