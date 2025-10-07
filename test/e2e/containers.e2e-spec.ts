import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { app, testUsers } from '../setup';

describe('ContainersController (e2e)', () => {
  let adminToken: string;

  beforeAll(async () => {
    console.log('⏳ Iniciando sesión con usuario admin para pruebas de contenedores...');
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

  it('should create a new container', async () => {
    const response = await request(app.getHttpServer())
      .post('/containers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Glass Jar',
        description: 'A reusable glass jar for candles',
        imageUrl: 'https://example.com/glass-jar.jpg',
        isActive: true,
        volume: 500,
        basePrice: 10,
        height: 11,
        diameter: 8,
        weight: 0.5,
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Glass Jar');
  });

  it('should get all containers', async () => {
    const response = await request(app.getHttpServer())
      .get('/containers')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single container by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/containers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Metal Tin',
        description: 'A durable metal tin for candles',
        imageUrl: 'https://example.com/glass-jar.jpg',
        isActive: true,
        volume: 500,
        basePrice: 10,
        height: 11,
        diameter: 8,
        weight: 0.5,
      });

    const containerId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/containers/${containerId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Metal Tin');
  });

  it('should update a container', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/containers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Plastic Container',
        description: 'A lightweight plastic container for candles',
        imageUrl: 'https://example.com/glass-jar.jpg',
        isActive: true,
        volume: 500,
        basePrice: 10,
        height: 11,
        diameter: 8,
        weight: 0.5,
      });

    const containerId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/containers/${containerId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Plastic Container',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Plastic Container');
  });

  it('should delete a container', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/containers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Ceramic Container',
        description: 'An elegant ceramic container for candles',
        imageUrl: 'https://example.com/glass-jar.jpg',
        isActive: true,
        volume: 500,
        basePrice: 10,
        height: 11,
        diameter: 8,
        weight: 0.5,
      });

    const containerId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/containers/${containerId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent container', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app.getHttpServer())
      .get(`/containers/${nonExistentId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });

  it('should return 401 when no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/containers');

    expect(response.status).toBe(401);
  });
});