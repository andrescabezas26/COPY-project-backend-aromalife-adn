import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { app, testUsers, candles } from '../setup'; // Asegúrate de importar bien

describe('GiftsController (e2e)', () => {
  let adminToken: string;

  beforeAll(async () => {
    console.log('⏳ Iniciando sesión con admin para tests de gifts...');

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    expect(login.status).toBe(201);
    adminToken = login.body.token;

    console.log('✅ Admin autenticado con éxito');
  });

  it('should create a new gift', async () => {
    const response = await request(app.getHttpServer())
      .post('/gifts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Gift Box',
        description: 'A beautiful gift box with candles and aromas',
        price: 50,
        imageUrl: 'https://example.com/gift-box.jpg',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Gift Box');
  });

  it('should get all gifts', async () => {
    const response = await request(app.getHttpServer())
      .get('/gifts')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single gift by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/gifts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Luxury Gift Set',
        description: 'A premium gift set with exclusive items',
        price: 100,
        imageUrl: 'https://example.com/gift-box.jpg',
      });

    const giftId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/gifts/${giftId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Luxury Gift Set');
  });

  it('should update a gift', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/gifts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Holiday Gift',
        description: 'A holiday-themed gift set',
        price: 75,
        imageUrl: 'https://example.com/gift-box.jpg',
      });

    const giftId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/gifts/${giftId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Holiday Gift',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Holiday Gift');
  });

  it('should delete a gift', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/gifts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Birthday Gift',
        description: 'A birthday-themed gift set',
        price: 60,
        imageUrl: 'https://example.com/gift-box.jpg',
      });

    const giftId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/gifts/${giftId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent gift', async () => {
    const response = await request(app.getHttpServer())
      .get('/gifts/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });
});
