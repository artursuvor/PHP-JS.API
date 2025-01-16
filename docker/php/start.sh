#! /bin/bash
# This script starts the php server

cd /var/www/html

composer install --ignore-platform-reqs
# optimize autoloader
composer dump-autoload --optimize
composer dump-autoload --classmap-authoritative

php artisan cache:clear
php artisan migrate --force

# Start cron
cron -f & # start cron in the background

# TODO exists key files for
# start php-fpm
php-fpm -R
