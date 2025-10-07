import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { app, testUsers } from '../setup';

describe('CartItemController (e2e)', () => {
  let userToken: string;
  let userExampleId: string;
  let cartId: string;
  let candleId: string;

  beforeAll(async () => {
    console.log('⏳ Iniciando sesión con usuario cliente para pruebas de items del carrito...');
    // Registrar e iniciar sesión como usuario para obtener token
    await request(app.getHttpServer())
      .post('/auth/register-client')
      .send({
        email: testUsers.admiEmail,
        password: testUsers.adminPassword,
        name: 'Test Client',
      });

    const userLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    expect(userLogin.status).toBe(201);
    expect(userLogin.body).toHaveProperty('token');
    userToken = userLogin.body.token;
  

    const candle = await request(app.getHttpServer())
          .post('/candles')
          .set('Authorization', `Bearer ${userToken}`)
          .send({
            name: 'Vanilla Candle',
            description: 'A soothing vanilla-scented candle',
            price: 20,
            stock: 50,
            aromaId: 1,
          });
    
        candleId = candle.body.id;

    const userExample = await request(app.getHttpServer())
          .post('/auth/register-client')
          .send({
            email: 'a@gmail.com',
            password: '123456',
            name: 'Test User',
            roles: ['client'],
          });
    
        userExampleId = userExample.body.id;
  });

  it('should add an item to the cart', async () => {
    const cart = await request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: userExampleId,
        checkedOut: false,
      });

    const cartId = cart.body.id;

    const response = await request(app.getHttpServer())
          .post(`/cart/${cartId}/items`)
          .set('Authorization', `Bearer ${userToken}`)
          .send({
            candleId: candleId,
            giftId: null,
            quantity: 1,
            unitPrice: 12,
            totalPrice: 12,
          });
  

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.quantity).toBe(1);
  });

  it('should get all items in the cart', async () => {
    const response = await request(app.getHttpServer())
      .get('/cart-items')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update the quantity of a cart item', async () => {
    const addItemResponse = await request(app.getHttpServer())
      .post('/cart-items')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: 2, // Using seeded product from test-seed.ts
        quantity: 1,
      });

    const cartItemId = addItemResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/cart-items/${cartItemId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        quantity: 3,
      });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(3);
  });

  it('should remove a cart item', async () => {
    const addItemResponse = await request(app.getHttpServer())
      .post('/cart-items')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: 3, // Using seeded product from test-seed.ts
        quantity: 1,
      });

    const cartItemId = addItemResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/cart-items/${cartItemId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent cart item', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app.getHttpServer())
      .get(`/cart-items/${nonExistentId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(404);
  });

  it('should return 401 when no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/cart-items');

    expect(response.status).toBe(401);
  });
});