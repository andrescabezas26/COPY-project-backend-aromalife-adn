import { app, testUsers } from '../setup';
import * as request from 'supertest';

describe('PlacesController (e2e)', () => {
  let adminToken: string;

  beforeAll(async () => {
    // Use shared test user for login
    const adminLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.admiEmail,
        password: testUsers.adminPassword,
      });

    adminToken = adminLogin.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new place', async () => {
    const response = await request(app.getHttpServer())
      .post('/places')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Aroma Store',
        icon: '🛋️'
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Aroma Store');
  });

  it('should get all places', async () => {
    const response = await request(app.getHttpServer())
      .get('/places')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single place by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/places')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Candle Shop',
        icon: '🛋️'
      });

    const placeId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/places/${placeId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Candle Shop');
  });

  it('should update a place', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/places')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Essential Oils Store',
        icon: '🛋️'
      });

    const placeId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/places/${placeId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Essential Oils Store',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Essential Oils Store');
  });

  it('should delete a place', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/places')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Temporary Place',
        icon: '🛋️'
      });

    const placeId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/places/${placeId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent place', async () => {
    const invalidPlaceId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app.getHttpServer())
      .get(`/places/${invalidPlaceId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });
});