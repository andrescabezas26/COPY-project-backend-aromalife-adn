import { app, testUsers } from '../setup';
import * as request from 'supertest';

describe('OrderItemsController (e2e)', () => {
  let adminToken: string;
  let userExampleId: string;
  let candleId: string;
  let orderId: string;

  beforeAll(async () => {
    // Use shared test user for login
    const adminLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    adminToken = adminLogin.body.token;

    const candle = await request(app.getHttpServer())
          .post('/candles')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            name: 'Vanilla Candle',
            description: 'A soothing vanilla-scented candle',
            price: 20,
            stock: 50,
            aromaId: 1 // Using seeded aroma from test-seed.ts
    });

    candleId = candle.body.id;

    const userExample = await request(app.getHttpServer()) 
        .post('/auth/register-client')
        .send({
            email: "a@gmail.com",
            password: "123456",
            name: "Test User",
            roles: ["client"]
        })
    
    userExampleId = userExample.body.id;

    const order = await request(app.getHttpServer())
          .post('/orders')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            userId: userExampleId, // Assuming user with ID 1 exists
            totalAmount: 100,
            shippingAddress: '{"street": "Calle 123", "city": "Ciudad Uno", "state": "Estado Uno", "country": "País Uno", "zipCode": "12345"}',
            status: 'PENDING',
    });

    orderId = order.body.id;

  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new order item', async () => {
    const response = await request(app.getHttpServer())
      .post('/order-items')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        orderId: orderId, // Assuming order with ID 1 exists
        candleId: candleId,
        giftId: null, // Assuming product with ID 1 exists
        quantity: 2,
        unitPrice: 20,
        totalPrice: 40,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.quantity).toBe(2);
  });

  it('should get all order items', async () => {
    const response = await request(app.getHttpServer())
      .get('/order-items')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single order item by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/order-items')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        orderId: orderId, // Assuming order with ID 1 exists
        candleId: candleId,
        giftId: null, // Assuming product with ID 1 exists
        quantity: 2,
        unitPrice: 20,
        totalPrice: 40,
      });

    const orderItemId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/order-items/${orderItemId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(2);
  });

  it('should update an order item', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/order-items')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        orderId: orderId, // Assuming order with ID 1 exists
        candleId: candleId,
        giftId: null, // Assuming product with ID 1 exists
        quantity: 2,
        unitPrice: 20,
        totalPrice: 40,
      });

    const orderItemId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/order-items/${orderItemId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        quantity: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(5);
  });

  it('should delete an order item', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/order-items')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        orderId: orderId, // Assuming order with ID 1 exists
        candleId: candleId,
        giftId: null, // Assuming product with ID 1 exists
        quantity: 2,
        unitPrice: 20,
        totalPrice: 40,
      });

    const orderItemId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/order-items/${orderItemId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent order item', async () => {
    const response = await request(app.getHttpServer())
      .get('/order-items/00000000-0000-0000-0000-000000000033')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });
});