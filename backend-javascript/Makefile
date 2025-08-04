# Variáveis
DOCKER_COMPOSE = docker-compose
SERVICE = backend-javascript

# Comandos básicos
test:
    npm run test

install:
    npm install

build:
    npm run build

start:
    npm run start

start-dev:
    npm run start:dev

lint:
    npm run lint


test-single:
    npm run test -- -t "$(name)"	

test-file:
    npm run test -- $(file)

test-watch:
    npm run test:watch

test-e2e:
    npm run test:e2e

# Docker
dc-up:
    $(DOCKER_COMPOSE) up --build

dc-down:
    $(DOCKER_COMPOSE) down --remove-orphans

dc-restart:
    $(DOCKER_COMPOSE) restart

dc-logs:
    $(DOCKER_COMPOSE) logs -f $(SERVICE)

dc-sh:
    $(DOCKER_COMPOSE) exec $(SERVICE) sh

dc-bash:
    $(DOCKER_COMPOSE) exec $(SERVICE) bash

dc-test:
    $(DOCKER_COMPOSE) exec $(SERVICE) npm run test

# Limpeza
clean:
    rm -rf dist coverage

.PHONY: install build start start-dev lint test test-watch test-e2e dc-up dc-down dc-restart dc-logs dc-sh dc-bash dc-test clean