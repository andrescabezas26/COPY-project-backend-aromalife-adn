import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { app, testUsers } from '../setup';

describe('CandlesController (e2e)', () => {
  let adminToken: string;

  beforeAll(async () => {
    console.log('⏳ Iniciando sesión con usuario admin para pruebas de velas...');
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    adminToken = response.body.token;
    console.log('✅ Sesión iniciada correctamente con admin');
  });

  it('should create a new candle', async () => {
    const response = await request(app.getHttpServer())
      .post('/candles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Vanilla Candle',
        description: 'A soothing vanilla-scented candle',
        price: 20,
        stock: 50,
        aromaId: 1 // Using seeded aroma from test-seed.ts
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Vanilla Candle');
  });

  it('should get all candles', async () => {
    const response = await request(app.getHttpServer())
      .get('/candles')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single candle by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/candles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Lavender Candle',
        description: 'A relaxing lavender-scented candle',
        price: 25,
        stock: 30,
        aromaId: 1 // Using seeded aroma from test-seed.ts
      });

    const candleId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/candles/${candleId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Lavender Candle');
  });

  it('should update a candle', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/candles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Rose Candle',
        description: 'A romantic rose-scented candle',
        price: 30,
        stock: 20,
        aromaId: 1 // Using seeded aroma from test-seed.ts
      });

    const candleId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/candles/${candleId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Rose Candle',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Rose Candle');
  });

  it('should delete a candle', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/candles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Mint Candle',
        description: 'A refreshing mint-scented candle',
        price: 15,
        stock: 40,
        aromaId: 1 // Using seeded aroma from test-seed.ts
      });

    const candleId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/candles/${candleId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent candle', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app.getHttpServer())
      .get(`/candles/${nonExistentId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });

  it('should return 401 when no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/candles');

    expect(response.status).toBe(401);
  });
});