FROM php:8.2-fpm

USER root

#setup supervisor
RUN mkdir -p /var/log/supervisor
RUN touch /var/log/supervisor/supervisord.log

RUN apt update && apt install -y \
    libfreetype6-dev \
    supervisor \
    systemctl \
    nano

RUN apt-get install -y \
        libzip-dev \
        zip \
        cron

RUN docker-php-ext-install zip

ARG XDEBUG
# install xdebug if enabled
RUN if "${XDEBUG}" == "true"; then pecl install xdebug-3.2.2 && docker-php-ext-enable xdebug ; fi

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

ARG WWW_USER
ARG WWW_UID
ARG WWW_GID
ARG WWW_ROOT_PWD

ENV WWW_USER=$WWW_USER
ENV WWW_UID=$WWW_UID
ENV WWW_GID=$WWW_GID
ENV WWW_ROOT_PWD=$WWW_ROOT_PWD

# Check if the user exists, if not, create the user
RUN if ! id -u $WWW_USER > /dev/null 2>&1; then adduser --uid $WWW_UID $WWW_USER; usermod -a -G $WWW_USER www-data; fi

# Verify that the user has been created
RUN id $WWW_USER

RUN touch /var/run/supervisord.pid  \
    && chown -R $WWW_USER:$WWW_USER /var/run/supervisord.pid \
    && touch /var/run/crond.pid \
    && chown -R $WWW_USER:$WWW_USER /var/run/crond.pid \
    && chmod -R 0770 /var/run/crond.pid

RUN usermod  --uid $WWW_UID $WWW_USER
RUN groupmod --gid $WWW_GID $WWW_USER

# change password for root so we can start cron in supervisor
RUN echo "root:${WWW_ROOT_PWD}" | chpasswd

EXPOSE 9000 9003
CMD ["/usr/bin/supervisord"]
