FROM php:8.1-apache

# Instalar extensões do PHP no linux
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \ 
    zip \
    unzip \
    git \
    curl \
    libpq-dev

# Instalar extensões do docker para PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install xml 
RUN docker-php-ext-install pdo 
RUN docker-php-ext-install pdo_pgsql 
RUN docker-php-ext-install pgsql 
RUN docker-php-ext-install soap 
RUN docker-php-ext-install mbstring 
RUN docker-php-ext-install bcmath 
RUN docker-php-ext-install zip 

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Habilitar mod_rewrite do Apache
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar arquivos do projeto
COPY . /var/www

# Dar permissões
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

# Definir permissões para as pastas /storage, /bootstrap e /database
RUN chmod -R 777 /var/www /var/www/storage /var/www/bootstrap /var/www/public /var/www/database

# Instalar dependências do Laravel
RUN composer install --no-interaction --prefer-dist

# Configurar DocumentRoot para a pasta public do Laravel
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/public|g' /etc/apache2/sites-available/000-default.conf

# Atualiza pacotes do projeto
RUN composer update

# Gera APP_KEY do projeto
RUN php artisan key:generate

EXPOSE 80