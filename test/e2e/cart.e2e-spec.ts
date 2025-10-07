import * as request from 'supertest';
import { app, testUsers, candles } from '../setup';

describe('CartController (e2e)', () => {
  let userToken: string;
  let userExampleId: string;
  let candleId: string;

  beforeAll(async () => {
    console.log('⏳ Iniciando sesión con usuario para carrito...');

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
        name: 'Test User',
      });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    expect(response.status).toBe(201);
    userToken = response.body.token;

    const userExample = await request(app.getHttpServer())
      .post('/auth/register-client')
      .send({
        email: 'a@gmail.com',
        password: '123456',
        name: 'Test User',
        roles: ['client'],
      });

    userExampleId = userExample.body.id;

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

    console.log('✅ Sesión iniciada correctamente con user');
  });

  it('should create a new cart', async () => {
    const response = await request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: userExampleId,
        checkedOut: false,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should add an item to the cart and update its quantity', async () => {
    const cart = await request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: userExampleId,
        checkedOut: false,
      });

    const cartId = cart.body.id;

    const addItem = await request(app.getHttpServer())
      .post(`/cart/${cartId}/items`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        candleId,
        giftId: null,
        quantity: 1,
        unitPrice: 12,
        totalPrice: 12,
      });

    const cartItemId = addItem.body.id;

    const response = await request(app.getHttpServer())
      .patch(`/cart/${cartId}/items/${cartItemId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        quantity: 3,
        unitPrice: 12,
        totalPrice: 36,
      });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(3);
  });

  it('should remove an item from the cart', async () => {
    const cart = await request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: userExampleId,
        checkedOut: false,
      });

    const cartId = cart.body.id;

    const addItem = await request(app.getHttpServer())
      .post(`/cart/${cartId}/items`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        candleId,
        giftId: null,
        quantity: 1,
        unitPrice: 10,
        totalPrice: 10,
      });

    const cartItemId = addItem.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/cart/${cartId}/items/${cartItemId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent cart item', async () => {
    const response = await request(app.getHttpServer())
      .get('/cart/00000000-0000-0000-0000-000000000022')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(404);
  });

  it('should return 401 if no token is provided', async () => {
    const cart = await request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: userExampleId,
        checkedOut: false,
      });

    const cartId = cart.body.id;
    const response = await request(app.getHttpServer()).get(`/cart/${cartId}`);
    expect(response.status).toBe(401);
  });
});
