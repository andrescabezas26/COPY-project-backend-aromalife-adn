import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export const initTestData = async (dataSource: DataSource) => {
  try {
    const entities = [
      { label: 'usuarios', file: 'user-data.sql', table: 'users' },
      { label: 'aromas', file: 'aroma-data.sql', table: 'aromas' },
      { label: 'velas', file: 'candle-data.sql', table: 'candles' },
      { label: 'containers', file: 'container-data.sql', table: 'containers' },
      { label: 'regalos', file: 'gift-data.sql', table: 'gifts' },
      { label: 'órdenes', file: 'order-data.sql', table: 'orders' },
      { label: 'ítems de orden', file: 'order-item-data.sql', table: 'order_items' },
      { label: 'ítems de carrito', file: 'cart-item-data.sql', table: 'cart_items' },
      { label: 'carritos', file: 'cart-data.sql', table: 'carts' },
      { label: 'main_options', file: 'main-options-data.sql', table: 'main_options' },
      { label: 'intended_impacts', file: 'intended-impacts-data.sql', table: 'intended_impacts' },
      { label: 'reviews', file: 'review-data.sql', table: 'reviews' },
      { label: 'lugares', file: 'place-data.sql', table: 'places' },
    ];

    const results: Record<string, any[]> = {};

    for (const entity of entities) {
      const filePath = path.join(__dirname, `../scripts/${entity.file}`);
      if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf8');
        try {
          await dataSource.query(sql);
          console.log(`✅ Datos de ${entity.label} cargados`);
        } catch (err) {
          console.warn(`⚠️ No se pudo cargar ${entity.label} (${entity.table}):`, err.message);
        }
      }

      try {
        const data = await dataSource.query(`SELECT * FROM "${entity.table}"`);
        results[entity.table] = data;
      } catch (err) {
        console.warn(`⚠️ No se pudo consultar datos de ${entity.table}:`, err.message);
        results[entity.table] = [];
      }
    }

    const admin = results['users']?.find((u) => u.email === 'admin@example.com');
    const client = results['users']?.find((u) => u.email === 'client1@example.com');

    return {
      testUsers: {
        adminEmail: admin?.email,
        adminPassword: 'admin123',
        clientEmail: client?.email,
        clientPassword: 'client123',
      },
      users: results['users'] || [],
      aromas: results['aromas'] || [],
      candles: results['candles'] || [],
      containers: results['containers'] || [],
      gifts: results['gifts'] || [],
      orders: results['orders'] || [],
      order_items: results['order_items'] || [],
      cart_items: results['cart_items'] || [],
      carts: results['carts'] || [],
      main_options: results['main_options'] || [],
      intended_impacts: results['intended_impacts'] || [],
      reviews: results['reviews'] || [],
      places: results['places'] || [],
    };

  } catch (error) {
    console.error('❌ Error al inicializar datos de prueba:', error);
    throw error;
  }
};
