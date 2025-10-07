import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { app, testUsers } from '../setup';

describe('AromasController (e2e)', () => {
  let adminToken: string;

  beforeAll(async () => {
    console.log('⏳ Iniciando sesión con usuario admin para pruebas...');
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

  it('should create a new aroma', async () => {
    const payload = {
      name: 'Lavender1',
      description: 'A calming lavender aroma',
      basePrice: 10,
      intensity: 3,
      category: 'Floral',
      isActive: true,
      imageUrl: 'https://example.com/lavender.jpg',
      olfativePyramid: {
        salida: 'Bergamot',
        corazon: 'Lavender1',
        fondo: 'Vanilla',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/aromas')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(payload);
      
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Lavender1');
    expect(response.body.olfativePyramid).toMatchObject(payload.olfativePyramid);
  });

  it('should get all aromas', async () => {
    const response = await request(app.getHttpServer())
      .get('/aromas')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single aroma by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/aromas')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Rose',
        description: 'A romantic rose aroma',
        basePrice: 15,
        intensity: 4,
        category: 'Floral',
        imageUrl: 'https://example.com/rose.jpg',
        olfativePyramid: {
          salida: 'Citrus',
          corazon: 'Rose',
          fondo: 'Musk',
        },
      });

    const aromaId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/aromas/${aromaId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Rose');
  });

  it('should update an aroma', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/aromas')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Jasmine',
        description: 'A sweet jasmine aroma',
        basePrice: 12,
        intensity: 3,
        category: 'Floral',
        imageUrl: 'https://example.com/jasmine.jpg',
        olfativePyramid: {
          salida: 'Green',
          corazon: 'Jasmine',
          fondo: 'Amber',
        },
      });

    const aromaId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/aromas/${aromaId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Jasmine',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Jasmine');
  });

  it('should delete an aroma', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/aromas')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Mint',
        description: 'A refreshing mint aroma',
        basePrice: 8,
        intensity: 2,
        category: 'Herbal',
        imageUrl: 'https://example.com/mint.jpg',
        olfativePyramid: {
          salida: 'Eucalyptus',
          corazon: 'Mint',
          fondo: 'Cedar',
        },
      });

    const aromaId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/aromas/${aromaId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent aroma', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app.getHttpServer())
      .get(`/aromas/${nonExistentId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });

  it('should return 401 when no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/aromas');

    expect(response.status).toBe(401);
  });
});
