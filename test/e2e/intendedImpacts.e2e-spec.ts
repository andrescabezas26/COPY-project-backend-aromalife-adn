import { app, testUsers } from '../setup';
import * as request from 'supertest';

describe('IntendedImpactsController (e2e)', () => {
  let adminToken: string;

  beforeAll(async () => {
    // Use shared test user for login
    const adminLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    adminToken = adminLogin.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new intended impact', async () => {
    const response = await request(app.getHttpServer())
      .post('/intended-impacts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Relaxation',
        icon: '🧘‍♀️',
        description: 'Promotes relaxation and stress relief',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Relaxation');
  });

  it('should get all intended impacts', async () => {
    const response = await request(app.getHttpServer())
      .get('/intended-impacts')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single intended impact by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/intended-impacts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Focus',
        icon: '🧠',
        description: 'Enhances concentration and mental clarity',
      });

    const impactId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/intended-impacts/${impactId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Focus');
  });

  it('should update an intended impact', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/intended-impacts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Energy Boost',
        icon: '⚡',
        description: 'Provides an energy boost and revitalization',
      });

    const impactId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/intended-impacts/${impactId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Energy Boost',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Energy Boost');
  });

  it('should delete an intended impact', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/intended-impacts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Sleep Aid',
        icon: '🌙',
        description: 'Helps improve sleep quality',
      });

    const impactId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/intended-impacts/${impactId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent intended impact', async () => {
    const response = await request(app.getHttpServer())
      .get('/intended-impacts/00000000-0000-0000-0000-000000000002')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });
  
});