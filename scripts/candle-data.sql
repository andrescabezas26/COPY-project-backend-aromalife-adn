INSERT INTO
  candle (
    id,
    name,
    description,
    price,
    "containerId",
    "aromaId",
    "audioUrl",
    "message",
    "qrUrl",
    "userId",
    "labelId"
  )
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Vela Relajante',
    'Vela aromática con aroma a Calma Profunda, ideal para momentos de relajación.',
    25000,
    'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380d11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'https://example.com/audio/relajante.mp3',
    'Relájate con esta vela.',
    'https://example.com/qr/relajante',
    '11111111-1111-1111-1111-111111111113', -- Client One
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    '11111111-1111-1111-1111-111111111112',
    'Vela Cítrica Pequeña',
    'Vela aromática con aroma a Vitalidad Cítrica, en un contenedor pequeño.',
    26000,
    'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380d11',
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'https://example.com/audio/citrica.mp3',
    'Energízate con esta vela.',
    'https://example.com/qr/citrica',
    '11111111-1111-1111-1111-111111111114', -- Client Two
    '11111111-1111-1111-1111-111111111112'
  ),
  (
    '11111111-1111-1111-1111-111111111113',
    'Vela Floral Mediana',
    'Vela aromática con aroma a Nube de Paz, en un contenedor mediano.',
    32000,
    'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380d12',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'https://example.com/audio/floral.mp3',
    'Disfruta de la serenidad floral.',
    'https://example.com/qr/floral',
    '11111111-1111-1111-1111-111111111113', -- Client One
    '11111111-1111-1111-1111-111111111113'
  ),
  (
    '11111111-1111-1111-1111-111111111114',
    'Vela Relajante Mediana',
    'Vela aromática con aroma a Calma Profunda, en un contenedor mediano.',
    34000,
    'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380d12',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'https://example.com/audio/relajante-mediana.mp3',
    'Relájate profundamente.',
    'https://example.com/qr/relajante-mediana',
    '11111111-1111-1111-1111-111111111114', -- Client Two
    '11111111-1111-1111-1111-111111111114'
  ),
  (
    '11111111-1111-1111-1111-111111111115',
    'Vela Energizante Grande',
    'Vela aromática con aroma a Vitalidad Cítrica, en un contenedor mediano.',
    36000,
    'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380d12',
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'https://example.com/audio/energizante.mp3',
    'Llena tu día de energía.',
    'https://example.com/qr/energizante',
    '11111111-1111-1111-1111-111111111113', -- Client One
    '11111111-1111-1111-1111-111111111115'
  );

INSERT INTO
  gift (id, name, description, base_price, image_url)
VALUES
  (
    'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c11',
    'Chocolates',
    'Exquisita selección de chocolates artesanales con sabores tropicales',
    45000,
    'https://example.com/images/chocolates.jpg'
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c12',
    'Flores',
    'Hermoso arreglo floral con variedades locales de temporada',
    65000,
    'https://example.com/images/flores.jpg'
  ),
  (
    'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380c13',
    'Sales para baño/tina',
    'Sales minerales relajantes con esencias naturales para spa en casa',
    38000,
    'https://example.com/images/sales-banio.jpg'
  ),
  (
    'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380c14',
    'Vino',
    'Fino vino de la mejor cosecha colombiana, ideal para celebrar',
    85000,
    'https://example.com/images/vino-colombiano.jpg'
  ),
  (
    'c5eebc99-9c0b-4ef8-bb6d-6bb9bd380c15',
    'Imagen Virgen',
    'Artística representación de la Virgen María en madera tallada',
    55000,
    'https://example.com/images/virgen-maria.jpg'
  ),
  (
    'c6eebc99-9c0b-4ef8-bb6d-6bb9bd380c16',
    'Jabones en glicerina',
    'Jabones artesanales de glicerina con aromas naturales y diseños únicos',
    32000,
    'https://example.com/images/jabones-glicerina.jpg'
  );