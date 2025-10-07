import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { initTestData } from './test-seed';

export let app: INestApplication;

// Accesibles en todos los tests
export let testUsers: any;
export let users: any[];
export let aromas: any[];
export let candles: any[];
export let containers: any[];
export let gifts: any[];
export let orders: any[];
export let order_items: any[];
export let cart_items: any[];
export let carts: any[];
export let main_options: any[];
export let intended_impacts: any[];
export let reviews: any[];
export let places: any[];

beforeAll(async () => {
  jest.setTimeout(30000);

  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  const dataSource = app.get(DataSource);
  const seedData = await initTestData(dataSource);

  // Asignar todos los datos globalmente
  testUsers = seedData.testUsers;
  ({
    testUsers,
    users,
    aromas,
    candles,
    containers,
    gifts,
    orders,
    order_items,
    cart_items,
    carts,
    main_options,
    intended_impacts,
    reviews,
    places,
  } = seedData);
});

afterEach(async () => {
  const dataSource = app.get(DataSource);
  const tables = [
    'users', 'aromas', 'candles', 'containers', 'gifts', 'orders',
    'order_items', 'cart_items', 'carts', 'main_options',
    'intended_impacts', 'reviews', 'places'
  ];

  for (const table of tables) {
    try {
      await dataSource.query(`TRUNCATE TABLE "${table}" CASCADE`);
    } catch (e) {
      console.warn(`⚠️ No se pudo truncar ${table}:`, e.message);
    }
  }

  const seedData = await initTestData(dataSource);

  testUsers = seedData.testUsers;
  ({
    users,
    aromas,
    candles,
    containers,
    gifts,
    orders,
    order_items,
    cart_items,
    carts,
    main_options,
    intended_impacts,
    reviews,
    places,
  } = seedData);
});

afterAll(async () => {
  if (app) await app.close();
});

export const getApp = () => app;
export const getRepository = (entity) => app.get(DataSource).getRepository(entity);
