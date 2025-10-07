import { app, testUsers } from '../setup';
import * as request from 'supertest';

describe('OrdersController (e2e)', () => {
  let adminToken: string;
  let userExampleId: string;

  beforeAll(async () => {
    // Use shared test user for login
    const adminLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    adminToken = adminLogin.body.token;
    const userExample = await request(app.getHttpServer()) 
    .post('/auth/register-client')
    .send({
        email: "a@gmail.com",
        password: "123456",
        name: "Test User",
        roles: ["client"]
    })

    userExampleId = userExample.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new order', async () => {
    const response = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        userId: userExampleId, // Assuming user with ID 1 exists
        totalAmount: 100,
        shippingAddress: '{"street": "Calle 123", "city": "Ciudad Uno", "state": "Estado Uno", "country": "País Uno", "zipCode": "12345"}',
        status: 'PENDING',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.status).toBe('PENDING');
  });

  it('should get all orders', async () => {
    const response = await request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single order by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        userId: userExampleId, // Assuming user with ID 1 exists
        totalAmount: 100,
        shippingAddress: '{"street": "Calle 123", "city": "Ciudad Uno", "state": "Estado Uno", "country": "País Uno", "zipCode": "12345"}',
        status: 'PENDING',
      });

    const orderId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('PENDING');
  });

  it('should update an order', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        userId: userExampleId, // Assuming user with ID 1 exists
        totalAmount: 100,
        shippingAddress: '{"street": "Calle 123", "city": "Ciudad Uno", "state": "Estado Uno", "country": "País Uno", "zipCode": "12345"}',
        status: 'PENDING',
      });

    const orderId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'SHIPPED',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('SHIPPED');
  });

  it('should delete an order', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        userId: userExampleId, // Assuming user with ID 1 exists
        totalAmount: 100,
        shippingAddress: '{"street": "Calle 123", "city": "Ciudad Uno", "state": "Estado Uno", "country": "País Uno", "zipCode": "12345"}',
        status: 'PENDING',
      });

    const orderId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent order', async () => {
    const response = await request(app.getHttpServer())
      .get('/orders/00000000-0000-0000-0000-000000000022')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });
});