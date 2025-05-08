# Etapa 1: Construção da aplicação
FROM maven:3.8.1-openjdk-11 AS build

# Diretório onde o código será copiado
WORKDIR /app

# Copia o arquivo pom.xml e o código fonte
COPY pom.xml .
COPY src ./src

# Roda o Maven para compilar a aplicação
RUN mvn clean package -DskipTests

# Etapa 2: Rodar a aplicação no container
FROM openjdk:11-jre-slim

# Diretório onde o JAR será copiado
WORKDIR /app

# Copia o arquivo JAR gerado no build
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta onde a aplicação estará rodando
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
