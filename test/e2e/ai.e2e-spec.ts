import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { app, testUsers } from '../setup';

describe('AiController (e2e)', () => {
  let adminToken: string;
  
  beforeAll(async () => {
    console.log('⏳ Iniciando sesión con usuario admin para pruebas...');
    
    // Iniciar sesión con el usuario admin que ya fue creado en setup.ts
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


  it('should generate text from AI service', async () => {
    const response = await request(app.getHttpServer())
      .post('/ai/generate-text')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        prompt: 'Genera un texto de prueba',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('text');
    expect(response.body.text).toBeDefined();
  });

  it('should generate an image from AI service', async () => {
    const response = await request(app.getHttpServer())
      .post('/ai/generate-image')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        prompt: 'Genera una imagen de prueba',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('imageUrl');
    expect(response.body.imageUrl).toBeDefined();
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .post('/ai/generate-text')
      .send({
        prompt: 'Genera un texto de prueba',
      });

    expect(response.status).toBe(401);
  });
});