// filepath: c:\Users\nicol\OneDrive - Universidad Icesi\University\7 Semestre\CompuNet III\project-backend-aromalife-adn\backend\scripts\run-seed.ts
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

async function runSeed() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos.');

    // Leer el archivo SQL
    const seedFilePath = path.join(__dirname, 'seed-data.sql');
    const seedQuery = fs.readFileSync(seedFilePath, 'utf-8');

    // Ejecutar el archivo SQL
    const result = await client.query(seedQuery);
    console.log('Datos insertados:', result.rows);
  } catch (error) {
    console.error('Error al ejecutar el seed:', error);
  } finally {
    await client.end();
    console.log('Conexión cerrada.');
  }
}

runSeed();