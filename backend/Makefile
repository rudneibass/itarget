# Nome do container do serviço Laravel
CONTAINER_NAME = php-prototipo-laravel

# Comando base para executar Artisan dentro do container
ARTISAN = docker exec -it $(CONTAINER_NAME) php artisan

# Previne erros quando os argumentos são interpretados como alvos inexistentes
%:
	@:

# Declara que 'artisan' é um comando, não um arquivo
.PHONY: artisan

# Comando genérico para executar qualquer comando Artisan, exemplo: make artisan config:clear
artisan:
	@$(ARTISAN) $(filter-out $@,$(MAKECMDGOALS))


config-clear:
	docker exec -it php-prototipo-laravel php artisan config:clear

cache-clear:
	docker exec -it php-prototipo-laravel php artisan cache:clear

clear-compiled:
	docker exec -it php-prototipo-laravel php artisan clear-compiled

test-all:
	docker exec -it php-prototipo-laravel php artisan test

test:
	docker exec -it php-prototipo-laravel php artisan test --filter $(name)

grep-curl:
	docker exec -it php-prototipo-laravel php -m | grep curl

# obter ip do container:  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' php-prototipo-laravel


# COMANDOS PERSONALIZADOS

# Comando para criar uma nova entidade em um módulo
# make create-module-entity module=NomeDoModulo entity=NomeDaEntidade
create-module-entity:
	@$(ARTISAN) make:module-entity $(module) $(entity)

# Comando para remover uma entidade de um módulo
# make remove-module-entity module=NomeDoModulo entity=NomeDaEntidade
remove-module-entity:
	@$(ARTISAN) remove:module-entity $(module) $(entity)

create-module:
	@$(ARTISAN) make:module $(module) $(entity)

create-module-layers-entity:
	@$(ARTISAN) make:module-layers-entity $(module) $(entity)	