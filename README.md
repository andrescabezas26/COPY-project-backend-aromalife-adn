# Aromalife Backend - Personalización de Velas

Bienvenido al backend de **Aromalife**, una aplicación web diseñada para ofrecer una experiencia única e inmersiva en la personalización de velas. Este repositorio contiene la API y la lógica del servidor.

## Tecnologías Utilizadas

- [NestJS](https://nestjs.com) - Framework para construir aplicaciones escalables del lado del servidor.
- [TypeORM](https://typeorm.io) - ORM para manejar la persistencia de datos.
- [Docker](https://www.docker.com) - Contenedores para facilitar el despliegue.

## Requisitos Previos

- [Node.js](https://nodejs.org) (versión 16 o superior)
- [Yarn](https://yarnpkg.com)
- [Docker](https://www.docker.com)

## Configuración del Proyecto

### Instalación

1. Instalar dependencias:

   ```bash
   yarn install
   ```

2. Configurar variables de entorno en un archivo `.env` basado en este example.

   ```.env
   # Server Configuration
   PORT=3000
   
   # Database Configuration
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_USERNAME=your_database_username
   DB_HOST=localhost
   DB_PORT=5432
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   
   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   
   # Image Generation API
   IMAGE_API_URL=your_image_api_url
   
   # Environment
   NODE_ENV=development

   ```

3. Ejecutar el servidor:

   ```bash
   # Desarrollo
   yarn start:dev

   ```

### Docker

1. Construir y ejecutar el contenedor:

   ```bash
   docker-compose up --build
   ```

2. Alimentar la base de datos:
   - psql -h localhost -U postgres -d postgres -f scripts/all-data.sql
   - Contraseña del .env

3. Acceder al API:
   - [http://localhost:3001](http://localhost:3001)

## Funcionalidades Clave del Backend

- Gestión de usuarios y autenticación
- Procesamiento de tests
- Recomendaciones de aromas basadas en reglas
- Gestión de cada entidad
- Integración con sistemas de pago (Pendiente)
- Base de datos (postgres)

### Informe

- Se entrega un archivo donde se muestra cómo probar cada una de las Api-Rest presentes en el proyecto en caso de querer probar alguna de forma manual
- Nombre del archivo "Informe.md"

## Swagger

Swagger es una herramienta que permite documentar y probar APIs de manera interactiva.
Este archivo contiene la configuración y las rutas necesarias para exponer la documentación
de la API utilizando Swagger. Para visualizar la documentación en un navegador, asegúrate
de que el servidor esté en ejecución y accede a la URL correspondiente:

```url
http://localhost:3001/api
```

Aquí podrás explorar los endpoints disponibles, sus parámetros, respuestas y probarlos directamente.

## Pruebas

Ejecutar pruebas unitarias

```bash
yarn test --coverage
```

Ejecutar pruebas de integración(supertest):

```bash
yarn run test:e2e
```

Ejecutar pruebas de postman:

- Importar el archivo "Project API Tests.postman_collection.json" en la aplicación Postman y seleccionar Run Collection

- Todas las pruebas mostrarán su respectivo código de aprobación (201 o 200)

## Despliegue

### Despliegue con Railway

1. Url del dominio:

   ```url
   https://backend-aromalife-production.up.railway.app
   ```

## Documentación

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Docker Documentation](https://docs.docker.com)

---

¡Gracias por elegir Aromalife!
