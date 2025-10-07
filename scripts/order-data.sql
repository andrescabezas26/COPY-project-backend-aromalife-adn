-- Agregando dos órdenes, una para cada cliente registrado
INSERT INTO "order" (id, "userId", "totalAmount", "shippingAddress", "status", "paymentDetails")
VALUES
  (
    '55555555-5555-5555-5555-555555555551',
    '11111111-1111-1111-1111-111111111113', -- Client One
    146000,
    '{"street": "Calle 123", "city": "Ciudad Uno", "state": "Estado Uno", "country": "País Uno", "zipCode": "12345"}',
    'PENDING',
    '{"method": "Credit Card", "transactionId": "txn12345", "status": "Pending"}'
  ),
  (
    '55555555-5555-5555-5555-555555555552',
    '11111111-1111-1111-1111-111111111114', -- Client Two
    60000,
    '{"street": "Avenida 456", "city": "Ciudad Dos", "state": "Estado Dos", "country": "País Dos", "zipCode": "67890"}',
    'PENDING',
    '{"method": "PayPal", "transactionId": "txn67890", "status": "Pending"}'
  );

INSERT INTO "order" ("userId", "totalAmount", "shippingAddress", "status", "paymentDetails") VALUES
  ('11111111-1111-1111-1111-111111111114', 75000,
    '{"street": "Carrera 10", "city": "Bogotá", "state": "Cundinamarca", "country": "Colombia", "zipCode": "110111"}',
    'PENDING',
    '{"method": "Credit Card", "transactionId": "txn001", "status": "Pending"}'),

  ('11111111-1111-1111-1111-111111111114', 82000,
    '{"street": "Calle 85", "city": "Medellín", "state": "Antioquia", "country": "Colombia", "zipCode": "050021"}',
    'PROCESSING',
    '{"method": "Credit Card", "transactionId": "txn002", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 59900,
    '{"street": "Av. Las Palmas", "city": "Cali", "state": "Valle", "country": "Colombia", "zipCode": "760001"}',
    'SHIPPED',
    '{"method": "PayPal", "transactionId": "txn003", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 91000,
    '{"street": "Calle 34", "city": "Barranquilla", "state": "Atlántico", "country": "Colombia", "zipCode": "080001"}',
    'DELIVERED',
    '{"method": "Credit Card", "transactionId": "txn004", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 47800,
    '{"street": "Calle 7", "city": "Cartagena", "state": "Bolívar", "country": "Colombia", "zipCode": "130001"}',
    'CANCELLED',
    '{"method": "Bank Transfer", "transactionId": "txn005", "status": "Rejected"}'),

  ('11111111-1111-1111-1111-111111111114', 120000,
    '{"street": "Cra 70", "city": "Pereira", "state": "Risaralda", "country": "Colombia", "zipCode": "660001"}',
    'PENDING',
    '{"method": "Credit Card", "transactionId": "txn006", "status": "Pending"}'),

  ('11111111-1111-1111-1111-111111111114', 68800,
    '{"street": "Calle 60", "city": "Manizales", "state": "Caldas", "country": "Colombia", "zipCode": "170001"}',
    'PROCESSING',
    '{"method": "PayPal", "transactionId": "txn007", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 99000,
    '{"street": "Av. Roosevelt", "city": "Pasto", "state": "Nariño", "country": "Colombia", "zipCode": "520001"}',
    'SHIPPED',
    '{"method": "Credit Card", "transactionId": "txn008", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 58000,
    '{"street": "Cra 12", "city": "Cúcuta", "state": "Norte de Santander", "country": "Colombia", "zipCode": "540001"}',
    'DELIVERED',
    '{"method": "Bank Transfer", "transactionId": "txn009", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 104000,
    '{"street": "Calle 100", "city": "Neiva", "state": "Huila", "country": "Colombia", "zipCode": "410001"}',
    'CANCELLED',
    '{"method": "PayPal", "transactionId": "txn010", "status": "Refunded"}'),

  ('11111111-1111-1111-1111-111111111114', 87000,
    '{"street": "Av. Siempre Viva", "city": "Tunja", "state": "Boyacá", "country": "Colombia", "zipCode": "150001"}',
    'DELIVERED',
    '{"method": "Credit Card", "transactionId": "txn011", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 79000,
    '{"street": "Calle 50", "city": "Ibagué", "state": "Tolima", "country": "Colombia", "zipCode": "730001"}',
    'SHIPPED',
    '{"method": "PayPal", "transactionId": "txn012", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 69000,
    '{"street": "Cra 5", "city": "Popayán", "state": "Cauca", "country": "Colombia", "zipCode": "190001"}',
    'PENDING',
    '{"method": "Credit Card", "transactionId": "txn013", "status": "Pending"}'),

  ('11111111-1111-1111-1111-111111111114', 93000,
    '{"street": "Av. Boyacá", "city": "Villavicencio", "state": "Meta", "country": "Colombia", "zipCode": "500001"}',
    'PROCESSING',
    '{"method": "PayPal", "transactionId": "txn014", "status": "Approved"}'),

  ('11111111-1111-1111-1111-111111111114', 62000,
    '{"street": "Calle 80", "city": "Montería", "state": "Córdoba", "country": "Colombia", "zipCode": "230001"}',
    'SHIPPED',
    '{"method": "Credit Card", "transactionId": "txn015", "status": "Approved"}');
