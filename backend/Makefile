# Nome do container do serviço Laravel
CONTAINER_NAME = php-prototipo-laravel

# Comando base para executar Artisan dentro do container
ARTISAN = docker exec -it $(CONTAINER_NAME) php artisan

# Previne erros quando os argumentos são interpretados como alvos inexistentes
%:
	@:

# Declara que 'artisan' é um comando, não um arquivo
.PHONY: artisan

# Comando genérico para executar qualquer comando Artisan
# make artisan config:clear
artisan:
	@$(ARTISAN) $(filter-out $@,$(MAKECMDGOALS))

# docker exec -it php-prototipo-laravel php artisan config:clear
config-clear:
	docker exec -it php-prototipo-laravel php artisan config:clear




# COMANDOS PERSONALIZADOS

# Comando para criar uma nova entidade em um módulo
# make create-module-entity module=NomeDoModulo entity=NomeDaEntidade
create-module-entity:
	@$(ARTISAN) make:module-entity $(module) $(entity)

# Comando para remover uma entidade de um módulo
# make remove-module-entity module=NomeDoModulo entity=NomeDaEntidade
remove-module-entity:
	@$(ARTISAN) remove:module-entity $(module) $(entity)

