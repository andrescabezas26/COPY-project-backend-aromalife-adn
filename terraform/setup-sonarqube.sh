#!/bin/bash
sudo apt update -y
sudo apt install -y docker.io docker-compose

# Crear carpeta de SonarQube
mkdir -p /opt/sonarqube
cd /opt/sonarqube

# Crear docker-compose
cat <<EOF > docker-compose.yml
version: '3.3'

services:
  sonarqube:
    image: sonarqube:community
    container_name: sonarqube
    ports:
      - "9000:9000"
    environment:
      - SONARQUBE_JDBC_URL=jdbc:postgresql://db:5432/sonar
      - SONARQUBE_JDBC_USERNAME=sonar
      - SONARQUBE_JDBC_PASSWORD=sonar
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
    depends_on:
      - db
    restart: always

  db:
    image: postgres:13
    container_name: sonarqube-db
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
      - POSTGRES_DB=sonar
    volumes:
      - postgresql_data:/var/lib/postgresql/data
    restart: always

volumes:
  sonarqube_data:
  sonarqube_extensions:
  postgresql_data:
EOF

# Levantar los contenedores
sudo docker-compose up -d
