#!/bin/sh

echo "Initilizing files for coripo docker ..."

echo ">> creating docker/etc/nginx/nginx_access.log"
touch ./docker/etc/nginx/nginx_access.log

echo ">> creating docker/etc/nginx/nginx_error.log"
touch ./docker/etc/nginx/nginx_error.log

echo ">> creating docker/etc/php/php_error.log"
mkdir ./docker/etc/php/log
touch ./docker/etc/php/log/php_error.log

echo ">> creating sessions directory"
mkdir sessions
chmod 777 sessions

echo ">> creating tmp directory"
mkdir tmp
chmod 777 tmp

FILE=./.env
if ! test -f "$FILE"; then
    echo ">> creating $FILE"
    cp ./sample.env ./.env
fi

echo "--- done ---"
