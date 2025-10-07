# Informe de Funcionalidades Implementadas en la API

Este informe detalla las funcionalidades implementadas en la API, describiendo cada endpoint, sus parámetros, respuestas, y las características de autenticación, autorización y persistencia en la base de datos.

---

## Endpoints

### **AuthController**

**Ruta base**: `/auth`

| Método | Ruta                         | Descripción                    | Cuerpo de la Petición | Respuesta      | Roles Permitidos       |
| ------ | ---------------------------- | ------------------------------ | --------------------- | -------------- | ---------------------- |
| POST   | `/auth/register`             | Registrar un nuevo usuario     | `CreateUserDto`       | `User`         | admin                  |
| POST   | `/auth/register-client`      | Registrar un nuevo cliente     | `CreateUserDto`       | `User`         | público                |
| POST   | `/auth/login`                | Login de usuario               | `LoginUserDto`        | `AuthResponse` | público                |
| POST   | `/auth/logout`               | Logout de usuario              | N/A                   | `void`         | admin, manager, client |
| GET    | `/auth/users`                | Obtener todos los usuarios     | N/A                   | `User[]`       | admin                  |
| GET    | `/auth/users/:id`            | Obtener usuario por ID         | N/A                   | `User`         | admin                  |
| PUT    | `/auth/users/:id`            | Actualizar usuario             | `UpdateUserDto`       | `User`         | admin                  |
| DELETE | `/auth/users/:id`            | Desactivar usuario             | N/A                   | `User`         | admin                  |
| PUT    | `/auth/users/:id/activate`   | Activar usuario                | N/A                   | `User`         | admin                  |
| DELETE | `/auth/users/:id/remove`     | Eliminar completamente usuario | N/A                   | `void`         | admin, client          |
| PUT    | `/auth/users/:id/deactivate` | Desactivar usuario             | N/A                   | `User`         | admin                  |
| PUT    | `/auth/users/:id/roles`      | Actualizar roles del usuario   | `UpdateUserRolesDto`  | `User`         | admin                  |

---

### **AromasController**

**Ruta base**: `/aromas`

| Método | Ruta                                        | Descripción                                | Cuerpo de la Petición   | Respuesta  | Roles Permitidos       |
| ------ | ------------------------------------------- | ------------------------------------------ | ----------------------- | ---------- | ---------------------- |
| POST   | `/aromas`                                   | Crear un nuevo aroma                       | `Partial<Aroma>`        | `Aroma`    | admin, manager         |
| GET    | `/aromas`                                   | Obtener todos los aromas                   | N/A                     | `Aroma[]`  | admin, manager, client |
| GET    | `/aromas/:id`                               | Obtener un aroma por ID                    | N/A                     | `Aroma`    | admin, manager, client |
| PUT    | `/aromas/:id`                               | Actualizar un aroma                        | `Partial<Aroma>`        | `Aroma`    | admin, manager         |
| DELETE | `/aromas/:id`                               | Eliminar un aroma                          | N/A                     | `void`     | admin, manager         |
| PATCH  | `/aromas/:id/assign-intended-impact/:intendedImpactId` | Asignar un impacto previsto a un aroma | N/A                     | `Aroma`    | admin, manager         |

---

### **CartItemController**

**Ruta base**: `/cart-items`

| Método | Ruta                                | Descripción                       | Cuerpo de la Petición   | Respuesta    | Roles Permitidos       |
| ------ | ----------------------------------- | --------------------------------- | ----------------------- | ------------ | ---------------------- |
| POST   | `/cart-items`                       | Crear un nuevo ítem de carrito    | `CreateCartItemDto`     | `CartItem`   | admin, manager, client |
| GET    | `/cart-items`                       | Obtener todos los ítems de carrito| N/A                     | `CartItem[]` | admin, manager, client |
| GET    | `/cart-items/:id`                   | Obtener un ítem de carrito por ID | N/A                     | `CartItem`   | admin, manager, client |
| PUT    | `/cart-items/:id`                   | Actualizar un ítem de carrito     | `UpdateCarItemDto`      | `CartItem`   | admin, manager, client |
| DELETE | `/cart-items/:id`                   | Eliminar un ítem de carrito       | N/A                     | `void`       | admin, manager, client |
| PATCH  | `/cart-items/:id/assign-candle/:candleId` | Asignar una vela a un ítem de carrito | N/A            | `CartItem`   | admin, manager, client |
| PATCH  | `/cart-items/:id/assign-gift/:giftId` | Asignar un regalo a un ítem de carrito | N/A              | `CartItem`   | admin, manager, client |
| PATCH  | `/cart-items/:id/assign-cart/:cartId` | Asignar un carrito a un ítem de carrito | N/A             | `CartItem`   | admin, manager, client |

---

### **CandlesController**

**Ruta base**: `/candles`

| Método | Ruta                                               | Descripción                                | Cuerpo de la Petición | Respuesta     | Roles Permitidos       |
| ------ | -------------------------------------------------- | ------------------------------------------ | --------------------- | ------------- | ---------------------- |
| POST   | `/candles`                                         | Crear una nueva vela                       | `CreateCandleDto`     | `Candle`      | admin, manager         |
| GET    | `/candles`                                         | Obtener todas las velas                    | N/A                   | `Candle[]`    | admin, manager, client |
| GET    | `/candles/:id`                                     | Obtener una vela por ID                    | N/A                   | `Candle`      | admin, manager, client |
| PUT    | `/candles/:id`                                     | Actualizar una vela                        | `UpdateCandleDto`     | `Candle`      | admin, manager         |
| DELETE | `/candles/:id`                                     | Eliminar una vela                          | N/A                   | `void`        | admin, manager         |
| GET    | `/candles/containers`                              | Obtener todos los contenedores disponibles | N/A                   | `Container[]` | admin, manager, client |
| GET    | `/candles/gifts`                                   | Obtener todos los regalos disponibles      | N/A                   | `Gift[]`      | admin, manager, client |
| PATCH  | `/candles/:candleId/assign-aroma/:aromaId`         | Asignar un aroma a una vela                | N/A                   | `Candle`      | admin, manager, client |
| PATCH  | `/candles/:candleId/assign-container/:containerId` | Asignar un contenedor a una vela           | N/A                   | `Candle`      | admin, manager, client |
| PATCH  | `/candles/:candleId/assign-user/:userId`           | Asignar una vela a un usuario              | N/A                   | `Candle`      | admin, manager, client |

---

### **CartController**

**Ruta base**: `/cart`

| Método | Ruta                            | Descripción                     | Cuerpo de la Petición | Respuesta  | Roles Permitidos       |
| ------ | ------------------------------- | ------------------------------- | --------------------- | ---------- | ---------------------- |
| POST   | `/cart`                         | Crear un nuevo carrito          | `CreateCartDto`       | `Cart`     | client, admin, manager |
| GET    | `/cart/:id`                     | Obtener un carrito por ID       | N/A                   | `Cart`     | client, admin, manager |
| POST   | `/cart/:id/items`               | Agregar un ítem al carrito      | `AddCartItemDto`      | `CartItem` | client, admin, manager |
| PATCH  | `/cart/:id`                     | Actualizar un carrito           | `UpdateCartDto`       | `Cart`     | client, admin, manager |
| DELETE | `/cart/:id`                     | Eliminar un carrito             | N/A                   | `void`     | client, admin, manager |
| PATCH  | `/cart/:cartId/items/:itemId`   | Actualizar un ítem del carrito  | `UpdateCartItemDto`   | `CartItem` | client, admin, manager |
| DELETE | `/cart/:cartId/items/:itemId`   | Eliminar un ítem del carrito    | N/A                   | `void`     | client, admin, manager |
| PATCH  | `/cart/:id/assign-user/:userId` | Asignar un carrito a un usuario | N/A                   | `Cart`     | client, admin, manager |

---

### **ContainersController**

**Ruta base**: `/containers`

| Método | Ruta              | Descripción                    | Cuerpo de la Petición | Respuesta     | Roles Permitidos       |
| ------ | ----------------- | ------------------------------ | --------------------- | ------------- | ---------------------- |
| POST   | `/containers`     | Crear un nuevo contenedor      | `Partial<Container>`  | `Container`   | admin, manager         |
| GET    | `/containers`     | Obtener todos los contenedores | N/A                   | `Container[]` | admin, manager, client |
| GET    | `/containers/:id` | Obtener un contenedor por ID   | N/A                   | `Container`   | admin, manager, client |
| PUT    | `/containers/:id` | Actualizar un contenedor       | `Partial<Container>`  | `Container`   | admin, manager         |
| DELETE | `/containers/:id` | Eliminar un contenedor         | N/A                   | `void`        | admin, manager         |

---

### **GiftsController**

**Ruta base**: `/gifts`

| Método | Ruta         | Descripción               | Cuerpo de la Petición | Respuesta | Roles Permitidos       |
| ------ | ------------ | ------------------------- | --------------------- | --------- | ---------------------- |
| POST   | `/gifts`     | Crear un nuevo regalo     | `CreateGiftDto`       | `Gift`    | admin, manager         |
| GET    | `/gifts`     | Obtener todos los regalos | N/A                   | `Gift[]`  | admin, manager, client |
| GET    | `/gifts/:id` | Obtener un regalo por ID  | N/A                   | `Gift`    | admin, manager, client |
| PUT    | `/gifts/:id` | Actualizar un regalo      | `UpdateGiftDto`       | `Gift`    | admin, manager         |
| DELETE | `/gifts/:id` | Eliminar un regalo        | N/A                   | `void`    | admin, manager         |

---

### **IntendedImpactController**

**Ruta base**: `/intended-impacts`

| Método | Ruta                                                     | Descripción                                  | Cuerpo de la Petición     | Respuesta          | Roles Permitidos       |
| ------ | -------------------------------------------------------- | -------------------------------------------- | ------------------------- | ------------------ | ---------------------- |
| POST   | `/intended-impacts`                                      | Crear un nuevo impacto previsto              | `CreateIntendedImpactDto` | `IntendedImpact`   | admin, manager         |
| GET    | `/intended-impacts`                                      | Obtener todos los impactos previstos         | N/A                       | `IntendedImpact[]` | admin, manager, client |
| GET    | `/intended-impacts/:id`                                  | Obtener un impacto previsto por ID           | N/A                       | `IntendedImpact`   | admin, manager, client |
| PUT    | `/intended-impacts/:id`                                  | Actualizar un impacto previsto               | `UpdateIntendedImpactDto` | `IntendedImpact`   | admin, manager         |
| DELETE | `/intended-impacts/:id`                                  | Eliminar un impacto previsto                 | N/A                       | `void`             | admin, manager         |
| PATCH  | `/intended-impacts/:id/assign-main-option/:mainOptionId` | Asignar una MainOption a un impacto previsto | N/A                       | `IntendedImpact`   | admin, manager         |
| PATCH  | `/intended-impacts/:id/assign-place/:placeId`            | Asignar un lugar a un impacto previsto       | N/A                       | `IntendedImpact`   | admin, manager         |

---

### **MainOptionsController**

**Ruta base**: `/main-options`

| Método | Ruta                | Descripción                            | Cuerpo de la Petición | Respuesta      | Roles Permitidos       |
| ------ | ------------------- | -------------------------------------- | --------------------- | -------------- | ---------------------- |
| POST   | `/main-options`     | Crear una nueva opción principal       | `CreateMainOptionDto` | `MainOption`   | admin, manager         |
| GET    | `/main-options`     | Obtener todas las opciones principales | N/A                   | `MainOption[]` | admin, manager, client |
| GET    | `/main-options/:id` | Obtener una opción principal por ID    | N/A                   | `MainOption`   | admin, manager, client |
| PUT    | `/main-options/:id` | Actualizar una opción principal        | `UpdateMainOptionDto` | `MainOption`   | admin, manager         |
| DELETE | `/main-options/:id` | Eliminar una opción principal          | N/A                   | `void`         | admin, manager         |

---

### **OrderItemController**

**Ruta base**: `/order-items`

| Método | Ruta                                       | Descripción                              | Cuerpo de la Petición | Respuesta     | Roles Permitidos |
| ------ | ------------------------------------------ | ---------------------------------------- | --------------------- | ------------- | ---------------- |
| POST   | `/order-items`                             | Crear un nuevo artículo de orden         | `CreateOrderItemDto`  | `OrderItem`   | admin, manager   |
| GET    | `/order-items`                             | Obtener todos los artículos de orden     | N/A                   | `OrderItem[]` | admin, manager   |
| GET    | `/order-items/:id`                         | Obtener un artículo de orden por ID      | N/A                   | `OrderItem`   | admin, manager   |
| PUT    | `/order-items/:id`                         | Actualizar un artículo de orden          | `UpdateOrderItemDto`  | `OrderItem`   | admin, manager   |
| DELETE | `/order-items/:id`                         | Eliminar un artículo de orden            | N/A                   | `void`        | admin, manager   |
| PATCH  | `/order-items/:id/assign-candle/:candleId` | Asignar una vela a un artículo de orden  | N/A                   | `OrderItem`   | admin, manager   |
| PATCH  | `/order-items/:id/assign-order/:orderId`   | Asignar una orden a un artículo de orden | N/A                   | `OrderItem`   | admin, manager   |
| PATCH  | `/order-items/:id/assign-gift/:giftId`     | Asignar un regalo a un artículo de orden | N/A                   | `OrderItem`   | admin, manager   |

---

### **OrdersController**

**Ruta base**: `/orders`

| Método | Ruta                              | Descripción                       | Cuerpo de la Petición   | Respuesta | Roles Permitidos       |
| ------ | --------------------------------- | --------------------------------- | ----------------------- | --------- | ---------------------- |
| POST   | `/orders`                         | Crear una nueva orden             | `Partial<Order>`        | `Order`   | admin, manager, client |
| GET    | `/orders`                         | Obtener todas las órdenes         | N/A                     | `Order[]` | admin, manager         |
| GET    | `/orders/:id`                     | Obtener una orden por ID          | N/A                     | `Order`   | admin, manager, client |
| PUT    | `/orders/:id`                     | Actualizar una orden              | `Partial<Order>`        | `Order`   | admin, manager         |
| DELETE | `/orders/:id`                     | Eliminar una orden                | N/A                     | `void`    | admin                  |
| PUT    | `/orders/:id/status`              | Actualizar el estado de una orden | `{status: OrderStatus}` | `Order`   | admin, manager         |
| POST   | `/orders/:id/payment`             | Procesar el pago de una orden     | `paymentDetails: any`   | `Order`   | admin, manager, client |
| PATCH  | `/orders/:id/assign-user/:userId` | Asignar un usuario a una orden    | N/A                     | `Order`   | admin, manager, client |

---

### **PlacesController**

**Ruta base**: `/places`

| Método | Ruta          | Descripción               | Cuerpo de la Petición | Respuesta | Roles Permitidos       |
| ------ | ------------- | ------------------------- | --------------------- | --------- | ---------------------- |
| POST   | `/places`     | Crear un nuevo lugar      | `CreatePlaceDto`      | `Place`   | admin, manager         |
| GET    | `/places`     | Obtener todos los lugares | N/A                   | `Place[]` | admin, manager, client |
| GET    | `/places/:id` | Obtener un lugar por ID   | N/A                   | `Place`   | admin, manager, client |
| PUT    | `/places/:id` | Actualizar un lugar       | `UpdatePlaceDto`      | `Place`   | admin, manager         |
| DELETE | `/places/:id` | Eliminar un lugar         | N/A                   | `void`    | admin, manager         |


---

### **ReviewController**

**Ruta base**: `/reviews`

| Método | Ruta                                 | Descripción                    | Cuerpo de la Petición | Respuesta  | Roles Permitidos       |
| ------ | ------------------------------------ | ------------------------------ | --------------------- | ---------- | ---------------------- |
| POST   | `/reviews`                           | Crear una nueva reseña         | `Partial<Review>`     | `Review`   | admin, manager, client |
| GET    | `/reviews`                           | Obtener todas las reseñas      | N/A                   | `Review[]` | admin, manager, client |
| GET    | `/reviews/:id`                       | Obtener una reseña por ID      | N/A                   | `Review`   | admin, manager, client |
| PUT    | `/reviews/:id`                       | Actualizar una reseña          | `Partial<Review>`     | `Review`   | admin, manager, client |
| DELETE | `/reviews/:id`                       | Eliminar una reseña            | N/A                   | `void`     | admin, manager, client |
| PATCH  | `/reviews/:id/assign-order/:orderId` | Asignar una reseña a una orden | N/A                   | `Review`   | admin, manager, client |

---

### **AppController**

**Ruta base**: `/`

| Método | Ruta | Descripción                                                          | Respuesta                         | Roles Permitidos |
| ------ | ---- | -------------------------------------------------------------------- | --------------------------------- | ---------------- |
| GET    | `/`  | Obtener un mensaje indicando que el backend está corriendo en NestJS | `'Backend is running in NestJS!'` | Todos            |
---

## Autenticación
La API utiliza JWT (JSON Web Tokens) para la autenticación. Los usuarios deben autenticarse proporcionando sus credenciales en el endpoint de inicio de sesión. Si las credenciales son válidas, el servidor genera un token JWT que debe incluirse en el encabezado Authorization de las solicitudes protegidas.

## Autorización
La API implementa autorización basada en roles. Cada usuario tiene un rol asignado (admin, user, etc.) que determina los permisos para acceder a ciertos endpoints. Solo los administradores pueden crear, actualizar o eliminar recursos protegidos.



## Persistencia en Base de Datos

Se utiliza **TypeORM** como ORM. Cada entidad representa una tabla, con relaciones definidas y validaciones aplicadas para garantizar integridad de datos.



## Conclusión

La API cubre gestión completa de productos, usuarios, carritos y órdenes con autenticación segura y control de acceso robusto. Su estructura RESTful y la integración con base de datos proporcionan una solución escalable y segura.