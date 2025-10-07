import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { app, testUsers } from '../setup';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/auth/entity/user.entity';

describe('AuthController (e2e)', () => {
  let adminToken: string;

  beforeAll(async () => {
    const userRepo = app.get(getRepositoryToken(User));
    await userRepo.delete({ email: newTestUser.email });
    await userRepo.delete({ email: 'newadmin@example.com' });
  });

  const newTestUser = {
    name: 'TestUser',
    email: 'newtest@example.com',
    password: 'Test123!'
  };

  it('should register a new client', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register-client')
      .send(newTestUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(newTestUser.email);
    expect(response.body).toHaveProperty('password');
  });

  it('should register a new user as admin', async () => {

    const loginAdmin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUsers.adminEmail,
        password: testUsers.adminPassword,
      });

    adminToken = loginAdmin.body.token;

    const adminUser = {
      name: 'New Admin',
      email: 'newadmin@example.com',
      password: 'Admin123!',
      roles: ['admin']
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(adminUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(adminUser.email);
  });

  it('should not register a user without admin token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(newTestUser);

    expect(response.status).toBe(401);
  });

  it('should login with valid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: newTestUser.email,
        password: newTestUser.password
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user_id');
    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toBe(newTestUser.email);
  });

  it('should not login with invalid password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: newTestUser.email,
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
  });

  it('should not login with non-existent email', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'anypassword'
      });

    expect(response.status).toBe(401);
  });

  it('should get user by id with admin token', async () => {
    // Primero hacemos login con el nuevo usuario para obtener su ID
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: newTestUser.email,
        password: newTestUser.password
      });

    const userId = loginResponse.body.user_id;

    const response = await request(app.getHttpServer())
      .get(`/auth/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(newTestUser.email);
    expect(response.body).not.toHaveProperty('password');
  });

  it('should not get user without admin token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/users/some-id');

    expect(response.status).toBe(401);
  });

  it('should not get user with invalid token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/users/some-id')
      .set('Authorization', 'Bearer invalid_token');

    expect(response.status).toBe(401);
  });

  it('should validate client registration data', async () => {
    const invalidUser = {
      email: null,
      password: '123', // too short
      name: ''
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register-client')
      .send(invalidUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
  });
});
