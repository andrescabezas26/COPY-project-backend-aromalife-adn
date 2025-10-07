import { app, testUsers } from '../setup';
import * as request from 'supertest';

describe('MainOptionsController (e2e)', () => {
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

  it('should create a new main option', async () => {
    const response = await request(app.getHttpServer())
      .post('/main-options')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Option A',
        description: 'Main option for customization',
        emoji: '🛋️',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Option A');
  });

  it('should get all main options', async () => {
    const response = await request(app.getHttpServer())
      .get('/main-options')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single main option by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/main-options')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Option B',
        description: 'Another main option',
        emoji: '🛋️',
      });

    const optionId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/main-options/${optionId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Option B');
  });

  it('should update a main option', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/main-options')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Option C',
        description: 'A customizable option',
        emoji: '🛋️',
      });

    const optionId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/main-options/${optionId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Option C',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Option C');
  });

  it('should delete a main option', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/main-options')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Option D',
        description: 'A removable option',
        emoji: '🛋️',
      });

    const optionId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/main-options/${optionId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existent main option', async () => {
    const response = await request(app.getHttpServer())
      .get('/main-options/00000000-0000-0000-0000-000000000002')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });
});