# Aromalife Backend

API backend para la aplicación de velas aromáticas desarrollada con NestJS.


## Parte 1 Configuración de SonarQube Local

Esta sección explica cómo configurar SonarQube localmente para analizar el código del proyecto Aromalife Backend.

### Prerequisitos

- Docker y Docker Compose instalados
- Node.js y npm/yarn
- Proyecto de NestJS configurado

### Configuración Inicial

#### 1. Docker Compose para SonarQube

El proyecto incluye un archivo `docker-compose.sonar.yml` que configura SonarQube con PostgreSQL:

```yaml
version: '3.8'

services:
  sonarqube:
    image: sonarqube:community
    container_name: sonarqube
    ports:
      - "9000:9000"
    networks:
      - sonarnet
    environment:
      - SONARQUBE_JDBC_URL=jdbc:postgresql://db:5432/sonar
      - SONARQUBE_JDBC_USERNAME=sonar
      - SONARQUBE_JDBC_PASSWORD=sonar
    volumes:
      - sonarqube_conf:/opt/sonarqube/conf
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_bundled-plugins:/opt/sonarqube/lib/bundled-plugins
    depends_on:
      - db

  db:
    image: postgres:13
    container_name: sonarqube-db
    networks:
      - sonarnet
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
      - POSTGRES_DB=sonar
    volumes:
      - postgresql:/var/lib/postgresql
      - postgresql_data:/var/lib/postgresql/data

networks:
  sonarnet:
    driver: bridge

volumes:
  sonarqube_conf:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_bundled-plugins:
  postgresql:
  postgresql_data:
```

#### 2. Archivo de Configuración

El proyecto incluye un archivo `sonar-project.properties` con la configuración específica:

```properties
# Información del proyecto
sonar.projectKey=aromalife-backend
sonar.projectName=Aromalife Backend
sonar.projectVersion=1.0

# Configuración de archivos fuente
sonar.sources=src
sonar.tests=test
sonar.exclusions=**/node_modules/**,**/dist/**,**/*.spec.ts,**/*.e2e-spec.ts

# Configuración de TypeScript
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Configuración de cobertura
sonar.coverage.exclusions=**/*.spec.ts,**/*.e2e-spec.ts,**/main.ts,**/*.module.ts

# Configuración del servidor
sonar.host.url=http://localhost:9000
sonar.login=squ_924321008a440a74dd4a4d46db02962e3d764eeb
```

### Pasos para Ejecutar

#### 1. Iniciar SonarQube

```bash
docker-compose -f docker-compose.sonar.yml up -d
```

#### 2. Acceder a SonarQube

1. Abrir el navegador en: http://localhost:9000
2. Credenciales por defecto:
   - Usuario: `admin`
   - Contraseña: `admin`

#### 3. Ejecutar Análisis

Para analizar el código del proyecto, simplemente ejecuta:

```bash
npm run sonar
```

Este comando:
1. Ejecuta las pruebas con cobertura (`npm run test:cov`)
2. Genera el reporte de cobertura en `coverage/lcov.info`
3. Ejecuta SonarQube Scanner para analizar el código

### Resultado

Una vez completado el análisis, podrás ver los resultados en el dashboard de SonarQube:

![alt text](image.png)

El dashboard muestra:
- **Quality Gate**: Estado general del proyecto (Passed/Failed)
- **Security**: Vulnerabilidades de seguridad encontradas (0 issues - Rating A)
- **Reliability**: Bugs y issues de confiabilidad (16 issues - Rating C)
- **Maintainability**: Code smells y problemas de mantenibilidad (76 issues - Rating A)
- **Coverage**: Porcentaje de cobertura de código (27.4% en 2.3k líneas)
- **Duplications**: Código duplicado (6.1% en 9.5k líneas)

### Configuración del Proyecto

El archivo `package.json` incluye los scripts necesarios:

```json
{
  "scripts": {
    "sonar": "npm run test:cov && sonar-scanner -Dsonar.token=squ_924321008a440a74dd4a4d46db02962e3d764eeb",
    "sonar:coverage": "npm run test:cov && sonar-scanner"
  }
}
```

### Notas Importantes

- El token de acceso está configurado en el archivo `sonar-project.properties`
- La base de datos embebida es solo para propósitos de evaluación
- Los archivos de prueba están excluidos del análisis de cobertura
- El análisis incluye solo archivos TypeScript del directorio `src`
- El proyecto actualmente tiene un Quality Gate **Passed** con algunas advertencias
