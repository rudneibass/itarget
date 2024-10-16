FROM php:8.1-apache

# Atualizar os pacotes e instalar dependências necessárias
RUN apt-get update && apt-get install -y git libpq-dev libmcrypt-dev libxml2-dev libtidy-dev libpng-dev \
    freetds-bin freetds-dev freetds-common libct4 libsybdb5 tdsodbc libfreetype6-dev \
    libjpeg62-turbo-dev libldap2-dev zlib1g-dev libzip-dev libc-client-dev libonig-dev curl \
    && ln -s /usr/lib/x86_64-linux-gnu/libsybdb.so /usr/lib/ \
    && apt install --reinstall freetds-dev \
    && docker-php-ext-install intl bcmath mbstring intl gd pgsql pdo pdo_pgsql soap tidy xml zip \
    && docker-php-ext-install sockets 

# Instalar a extensão MongoDB para PHP
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Instalar o Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm -rf composer-setup.php

# Instalar o módulo de cabeçalhos do Apache
RUN a2enmod headers

# Habilitar o módulo de reescrita do Apache e reiniciar o serviço Apache
RUN a2enmod rewrite && service apache2 restart

# Expor a porta 8080
EXPOSE 8080

# Definir o diretório de trabalho
WORKDIR /var/www

# Definir permissões para as pastas storage e bootstrap
RUN chmod -R 777 storage bootstrap public