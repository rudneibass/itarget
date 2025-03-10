# Usa uma imagem oficial do Python
FROM python:3.9

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos necessários para dentro do container
COPY requirements.txt .
COPY api.py .
COPY meu_modelo.h5 .
COPY scaler.pkl .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta 8000 para comunicação externa
EXPOSE 8000

# Comando para rodar a API
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
