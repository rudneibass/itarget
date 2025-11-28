#!/bin/bash

# ================================
# Script de deploy para EC2 AWS
# Aplicação Spring Boot .jar com systemd
# ================================

APP_NAME="backend-java"
JAR_NAME="backend-java-1.0.0.jar"  # Ajuste conforme o nome gerado pelo Maven
REMOTE_USER="ubuntu"
REMOTE_HOST="ec2-xx-xx-xx-xx.compute-1.amazonaws.com" # Substitua pelo seu host
KEY_PATH="~/.ssh/sua-chave.pem" # Caminho da sua chave SSH
REMOTE_DIR="/home/ubuntu/app"

echo "🔄 Iniciando deploy para $REMOTE_HOST"

# 1. Parar a aplicação se estiver rodando
echo "🛑 Parando aplicação remota (se estiver rodando)..."
ssh -i "$KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" "pkill -f $JAR_NAME || true"

# 2. Criar pasta no servidor remoto (se não existir)
echo "📁 Garantindo diretório remoto..."
ssh -i "$KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_DIR"

# 3. Copiar o arquivo .jar para o servidor remoto
echo "📦 Enviando arquivo $JAR_NAME..."
scp -i "$KEY_PATH" "target/$JAR_NAME" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"

# 4. Criar o serviço systemd para a aplicação
echo "🛠️ Configurando serviço systemd..."

ssh -i "$KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" <<EOF
    sudo tee /etc/systemd/system/$APP_NAME.service > /dev/null <<EOL
[Unit]
Description=Spring Boot Application
After=network.target

[Service]
User=ubuntu
ExecStart=/usr/bin/java -jar $REMOTE_DIR/$JAR_NAME
WorkingDirectory=$REMOTE_DIR
Restart=always
Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
Environment=PATH=$JAVA_HOME/bin:$PATH
StandardOutput=file:/var/log/$APP_NAME.out
StandardError=file:/var/log/$APP_NAME.err
TimeoutStartSec=20
TimeoutStopSec=20

[Install]
WantedBy=multi-user.target
EOL
    sudo systemctl daemon-reload
    sudo systemctl enable $APP_NAME
    sudo systemctl start $APP_NAME
EOF

echo "✅ Serviço systemd criado e aplicação iniciada com sucesso!"
echo "🚀 A aplicação está agora rodando em segundo plano e será reiniciada automaticamente em caso de reinicialização do servidor."

# ================================
# Explicação das Etapas
# Parar a aplicação: Caso a aplicação já esteja rodando, ela será parada.
#
# Copiar o .jar para o servidor: O arquivo gerado no build será transferido para o servidor EC2.
#
# Criar o serviço systemd: O script cria um arquivo de configuração de serviço no /etc/systemd/system/ para a aplicação. Este serviço controla a execução do seu .jar no EC2, incluindo:
#
# Restart: A aplicação será reiniciada automaticamente se falhar.
#
# Logs: Saídas padrão e de erro serão armazenadas em arquivos no diretório /var/log/.
#
# Habilitar e iniciar o serviço: O serviço é habilitado para iniciar com o sistema e é iniciado imediatamente após o deploy.
#
# 🔧 Configuração do Serviço systemd:
# O arquivo backend-java.service terá a seguinte configuração:
# [Unit]
# Description=Spring Boot Application
# After=network.target
#
# [Service]
# User=ubuntu
# ExecStart=/usr/bin/java -jar /home/ubuntu/app/backend-java-1.0.0.jar
# WorkingDirectory=/home/ubuntu/app
# Restart=always
# Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
# Environment=PATH=$JAVA_HOME/bin:$PATH
# StandardOutput=file:/var/log/backend-java.out
# StandardError=file:/var/log/backend-java.err
# TimeoutStartSec=20
# TimeoutStopSec=20
#
# [Install]
# WantedBy=multi-user.target
# ================================

# ================================
# 🚀 Após o deploy:
# Você pode verificar o status do serviço com:
# sudo systemctl status backend-java
#
# Para parar ou reiniciar a aplicação:
# sudo systemctl stop backend-java
# sudo systemctl restart backend-java
#
# Os logs estarão em /var/log/backend-java.out e /var/log/backend-java.err.
# ==================================