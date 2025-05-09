# Nome do container do serviço Laravel
CONTAINER_PROD_NAME = backend-java
CONTAINER_DEV_NAME = backend-java-dev

# Comando base para executar mvn dentro do container
MVN = docker exec -it $(CONTAINER_NAME) mvn

# Previne erros quando os argumentos são interpretados como alvos inexistentes
%:
	@:

# Declara que 'mvn' é um comando, não um arquivo
.PHONY: mvn

# Comando genérico para executar qualquer comando mvn
mvn:
	@$(MVN) $(filter-out $@,$(MAKECMDGOALS))

clean:
	docker exec -it $(CONTAINER_DEV_NAME) mvn clean install -U

test-all:
	docker exec -it $(CONTAINER_DEV_NAME) mvn test

test:
	docker exec -it $(CONTAINER_DEV_NAME) mvn -Dtest=$(name) test

grep-curl:
	docker exec -it $(CONTAINER_NAME) -m | grep curl

bash:
	docker exec -it $(CONTAINER_NAME) bash