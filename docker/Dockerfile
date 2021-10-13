FROM php:8.0-fpm

RUN true \
    && mkdir /Application \
    && apt-get update \
    && apt-get install -y wget git zip curl \
    && docker-php-ext-install pdo pdo_mysql \
    && wget https://get.symfony.com/cli/installer -O - | bash \
    && mv /root/.symfony/bin/symfony /usr/local/bin/symfony \
    && true

WORKDIR /Application

COPY --from=composer:2 /usr/bin/composer /usr/bin/