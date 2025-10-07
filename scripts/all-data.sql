INSERT INTO
  "user" (
    id,
    email,
    password,
    name,
    "lastName",
    phone,
    "phoneCountryCode",
    city,
    country,
    address,
    "profilePicture",
    roles,
    "isActive"
  )
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'admin@example.com',
    '$2b$10$Q9p4jTtVi9.clVVBBQsjLexKdr2tJ/sXvmJG69m35T6ZLsgtciUbK',
    'Admin',
    'User',
    '1234567890',
    '+1',
    'New York',
    'United States',
    '123 Admin Street',
    'https://randomuser.me/api/portraits/men/1.jpg',
    '{"admin"}',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111112',
    'manager@example.com',
    '$2b$10$zUAUqkdTl27NJZLfW0UHAet/CsaeDfAxTxfph8a/8YodNktbVj6V.',
    'Manager',
    'User',
    '2345678901',
    '+1',
    'Los Angeles',
    'United States',
    '456 Manager Avenue',
    'https://randomuser.me/api/portraits/men/2.jpg',
    '{"manager"}',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111119',
    'pipecabezas00@gmail.com',
    '$2b$10$zUAUqkdTl27NJZLfW0UHAet/CsaeDfAxTxfph8a/8YodNktbVj6V.',
    'Andres',
    'Cabezas',
    '2345678901',
    '+1',
    'Los Angeles',
    'United States',
    '456 Manager Avenue',
    'https://randomuser.me/api/portraits/men/3.jpg',
    '{"manager"}',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111129',
    'nicolascuellar.molina@gmail.com',
    '$2b$10$zUAUqkdTl27NJZLfW0UHAet/CsaeDfAxTxfph8a/8YodNktbVj6V.',
    'Nicolas',
    'Cuellar',
    '2345678901',
    '+1',
    'Los Angeles',
    'United States',
    '456 Manager Avenue',
    'https://randomuser.me/api/portraits/men/4.jpg',
    '{"manager"}',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111113',
    'client1@example.com',
    '$2b$10$R2mkXLBDeuFmwBPk26zQGe0ybsJ1lzPayvPpPPV194P6b46DnDlrK',
    'Client',
    'One',
    '3456789012',
    '+1',
    'Chicago',
    'United States',
    '789 Client Road',
    'https://randomuser.me/api/portraits/men/5.jpg',
    '{"client"}',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111114',
    'client2@example.com',
    '$2b$10$QBmYP2pPoUTzN4jeGJ2DfeTwcGbBt94s7JNrst2XF1HMR0jP0w0Uq',
    'Client',
    'Two',
    '4567890123',
    '+1',
    'Miami',
    'United States',
    '321 Client Boulevard',
    'https://randomuser.me/api/portraits/women/6.jpg',
    '{"client"}',
    true
  );

-- admin123
-- manager123
-- client123
-- client124
INSERT INTO
  place (id, name, icon)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Sala de estar',
    '🛋️'
  ),
  (
    '11111111-1111-1111-1111-111111111112',
    'Dormitorio',
    '🛏️'
  ),
  (
    '11111111-1111-1111-1111-111111111113',
    'Baño',
    '🚽'
  ),
  (
    '11111111-1111-1111-1111-111111111114',
    'Cocina / Comedor',
    '🍽️'
  ),
  (
    '11111111-1111-1111-1111-111111111115',
    'Oficina / estudio / Negocio',
    '💼'
  );

INSERT INTO
  main_option (id, name, description, emoji)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Decorar espacios',
    'Embellece tu hogar u oficina con una vela decorativa',
    '🌿'
  ),
  (
    '11111111-1111-1111-1111-111111111112',
    '¿Cómo te quieres sentir?',
    'Crea una atmósfera que evoque emociones específicas',
    '😊'
  ),
  (
    '11111111-1111-1111-1111-111111111113',
    'Hacer un regalo especial',
    'Sorprende a alguien con un detalle personalizado',
    '🎁'
  );

INSERT INTO
  intended_impact (id, name, icon, description)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Agradecimiento',
    '🙏',
    'Expresar gratitud sincera, gesto delicado y emocional'
  ),
  (
    '11111111-1111-1111-1111-111111111112',
    'Cumpleaños',
    '🎂',
    'Alegría, celebración, momentos dulces y coloridos'
  ),
  (
    '11111111-1111-1111-1111-111111111113',
    'Amor',
    '❤️',
    'Expresar sentimientos profundos, romanticismo y conexión íntima'
  ),
  (
    '11111111-1111-1111-1111-111111111114',
    'Condolencias',
    '🕊️',
    'Acompañar en un momento difícil con respeto, consuelo y delicadeza'
  ),
  (
    '11111111-1111-1111-1111-111111111115',
    'Gran noticia',
    '🎉',
    'Celebrar logros, éxitos o comienzos con entusiasmo y elegancia'
  ),
  (
    '11111111-1111-1111-1111-111111111116',
    'Amistad',
    '👫',
    'Vínculos sinceros, cariño espontáneo, conexión cercana y alegre'
  ),
  (
    '11111111-1111-1111-1111-111111111117',
    'Navidad',
    '🎄',
    'Magia, calidez, tradición y emociones reconfortantes'
  ),
  (
    '11111111-1111-1111-1111-111111111118',
    'Día especial profesional',
    '👔',
    'Reconocimiento, respeto y gratitud hacia una figura de apoyo y dedicación'
  ),
  (
    '11111111-1111-1111-1111-111111111119',
    'Relajado',
    '🌿',
    'Tranquilidad, reducir el estrés, crear un ambiente suave y acogedor'
  ),
  (
    '11111111-1111-1111-1111-111111111120',
    'Energético',
    '⚡',
    'Estimular la energía, activar cuerpo y mente, dar vitalidad'
  ),
  (
    '11111111-1111-1111-1111-111111111121',
    'Sensual',
    '🔥',
    'Despertar los sentidos, seducir, crear intimidad'
  ),
  (
    '11111111-1111-1111-1111-111111111122',
    'Inspirado',
    '💡',
    'Estimular creatividad, nuevas ideas y claridad mental'
  ),
  (
    '11111111-1111-1111-1111-111111111123',
    'Seguro',
    '🛡️',
    'Empoderamiento, firmeza interior, estabilidad emocional'
  ),
  (
    '11111111-1111-1111-1111-111111111124',
    'Conectado a la naturaleza',
    '🌍',
    'Paz, autenticidad, rodeado de elementos naturales'
  ),
  (
    '11111111-1111-1111-1111-111111111125',
    'Calidez',
    '🏠',
    'Crear un ambiente acogedor, reconfortante y envolvente, ideal para compartir o descansar. Fragancias que envuelven, abrazan y aportan sensación de hogar, intimidad o protección'
  ),
  (
    '11111111-1111-1111-1111-111111111126',
    'Frescura',
    '🌬️',
    'Refrescar el ambiente y dar una sensación de aire limpio y renovado. Fragancias ligeras, revitalizantes y con efecto estimulante'
  ),
  (
    '11111111-1111-1111-1111-111111111127',
    'Limpieza',
    '🧼',
    'Generar una sensación de orden, pureza y frescura constante. Aromas puros, suaves y asociados a lo limpio y ordenado'
  ),
  (
    '11111111-1111-1111-1111-111111111128',
    'Conexión con la naturaleza',
    '🌲',
    'Conectar con elementos naturales: bosques, hierbas, aire libre. Fragancias herbales, verdes, terrosas o inspiradas en entornos naturales'
  ),
  (
    '11111111-1111-1111-1111-111111111129',
    'Bienestar / Spa',
    '🧖',
    'Sensación de relajación profunda, autocuidado y renovación. Fragancias herbales, verdes, terrosas o inspiradas en entornos naturales'
  ),
  (
    '11111111-1111-1111-1111-111111111130',
    'Concentración / Claridad mental',
    '🧠',
    'Estimular la mente, favorecer la atención y la productividad'
  ),
  (
    '11111111-1111-1111-1111-111111111131',
    'Relajación / Sueño',
    '🛌',
    'Inducir descanso profundo, calmar la mente y relajar el cuerpo'
  ),
  (
    '11111111-1111-1111-1111-111111111132',
    'Sensualidad',
    '💋',
    'Crear una atmósfera íntima, cálida y envolvente'
  ),
  (
    '11111111-1111-1111-1111-111111111133',
    'Limpieza / Pureza',
    '✨',
    'Sensación de sábanas limpias, frescura suave y orden'
  ),
  (
    '11111111-1111-1111-1111-111111111134',
    'Romanticismo / Ternura',
    '💝',
    'Evocar amor suave, cariño, conexión emocional'
  ),
  (
    '11111111-1111-1111-1111-111111111135',
    'Frescura / Limpieza',
    '🚿',
    'Sensación de higiene, frescor, orden y pureza'
  ),
  (
    '11111111-1111-1111-1111-111111111136',
    'Energía / Vitalidad',
    '⏱️',
    'Activar el cuerpo, comenzar el día con dinamismo'
  ),
  (
    '11111111-1111-1111-1111-111111111137',
    'Sensualidad / Relajación',
    '🛁',
    'Bañeras largas, velas, conexión íntima con uno mismo o pareja'
  ),
  (
    '11111111-1111-1111-1111-111111111138',
    'Limpieza / Orden',
    '🧹',
    'Neutralizar olores, generar sensación de frescura y pulcritud'
  ),
  (
    '11111111-1111-1111-1111-111111111139',
    'Frescura Natural',
    '🍃',
    'Sensación vegetal, herbácea, conexión con lo orgánico'
  ),
  (
    '11111111-1111-1111-1111-111111111140',
    'Conexión / Calidez Familiar',
    '👨‍👩‍👧‍👦',
    'Aromas que evocan hogar, recetas, cariño y tradición'
  ),
  (
    '11111111-1111-1111-1111-111111111141',
    'Alegría / Vitalidad',
    '😊',
    'Aromas que estimulan el apetito y el ánimo'
  ),
  (
    '11111111-1111-1111-1111-111111111142',
    'Inspiración / Creatividad',
    '🎨',
    'Estimular ideas nuevas, energía positiva y motivación'
  ),
  (
    '11111111-1111-1111-1111-111111111143',
    'Equilibrio / Serenidad',
    '☯️',
    'Aromas que estabilizan emociones y ayudan a trabajar en paz'
  );

-- Intended impacts para "Decorar espacios" (mainOptionId: 11111111-1111-1111-1111-111111111111)
UPDATE intended_impact
SET
  "placeId" = '11111111-1111-1111-1111-111111111111', -- Sala de estar
  "mainOptionId" = '11111111-1111-1111-1111-111111111111'
WHERE
  id IN (
    '11111111-1111-1111-1111-111111111125', -- Calidez
    '11111111-1111-1111-1111-111111111126', -- Frescura
    '11111111-1111-1111-1111-111111111127', -- Limpieza
    '11111111-1111-1111-1111-111111111128', -- Conexión con la naturaleza
    '11111111-1111-1111-1111-111111111129', -- Bienestar / Spa
    '11111111-1111-1111-1111-111111111130' -- Concentración / Claridad mental
  );

UPDATE intended_impact
SET
  "placeId" = '11111111-1111-1111-1111-111111111112', -- Dormitorio
  "mainOptionId" = '11111111-1111-1111-1111-111111111111'
WHERE
  id IN (
    '11111111-1111-1111-1111-111111111131', -- Relajación / Sueño
    '11111111-1111-1111-1111-111111111132', -- Sensualidad
    '11111111-1111-1111-1111-111111111129', -- Bienestar / Spa (repetido para dormitorio)
    '11111111-1111-1111-1111-111111111133', -- Limpieza / Pureza
    '11111111-1111-1111-1111-111111111134' -- Romanticismo / Ternura
  );

UPDATE intended_impact
SET
  "placeId" = '11111111-1111-1111-1111-111111111113', -- Baño
  "mainOptionId" = '11111111-1111-1111-1111-111111111111'
WHERE
  id IN (
    '11111111-1111-1111-1111-111111111135', -- Frescura / Limpieza
    '11111111-1111-1111-1111-111111111136', -- Energía / Vitalidad
    '11111111-1111-1111-1111-111111111129', -- Bienestar / Spa (repetido para baño)
    '11111111-1111-1111-1111-111111111137' -- Sensualidad / Relajación
  );

UPDATE intended_impact
SET
  "placeId" = '11111111-1111-1111-1111-111111111114', -- Cocina / Comedor
  "mainOptionId" = '11111111-1111-1111-1111-111111111111'
WHERE
  id IN (
    '11111111-1111-1111-1111-111111111138', -- Limpieza / Orden
    '11111111-1111-1111-1111-111111111139', -- Frescura Natural
    '11111111-1111-1111-1111-111111111140', -- Conexión / Calidez Familiar
    '11111111-1111-1111-1111-111111111141' -- Alegría / Vitalidad
  );

UPDATE intended_impact
SET
  "placeId" = '11111111-1111-1111-1111-111111111115', -- Oficina / estudio / Negocio
  "mainOptionId" = '11111111-1111-1111-1111-111111111111'
WHERE
  id IN (
    '11111111-1111-1111-1111-111111111130', -- Concentración / Claridad mental
    '11111111-1111-1111-1111-111111111142', -- Inspiración / Creatividad
    '11111111-1111-1111-1111-111111111143' -- Equilibrio / Serenidad
  );

-- Intended impacts para "¿Cómo te quieres sentir?" (mainOptionId: 11111111-1111-1111-1111-111111111112)
UPDATE intended_impact
SET
  "placeId" = NULL,
  "mainOptionId" = '11111111-1111-1111-1111-111111111112'
WHERE
  id IN (
    '11111111-1111-1111-1111-111111111119', -- Relajado
    '11111111-1111-1111-1111-111111111120', -- Energético
    '11111111-1111-1111-1111-111111111121', -- Sensual
    '11111111-1111-1111-1111-111111111122', -- Inspirado
    '11111111-1111-1111-1111-111111111123', -- Seguro
    '11111111-1111-1111-1111-111111111124' -- Conectado a la naturaleza
  );

-- Intended impacts para "Hacer un regalo especial" (mainOptionId: 11111111-1111-1111-1111-111111111113)
UPDATE intended_impact
SET
  "placeId" = NULL,
  "mainOptionId" = '11111111-1111-1111-1111-111111111113'
WHERE
  id IN (
    '11111111-1111-1111-1111-111111111111', -- Agradecimiento
    '11111111-1111-1111-1111-111111111112', -- Cumpleaños
    '11111111-1111-1111-1111-111111111113', -- Amor
    '11111111-1111-1111-1111-111111111114', -- Condolencias
    '11111111-1111-1111-1111-111111111115', -- Gran noticia
    '11111111-1111-1111-1111-111111111116', -- Amistad
    '11111111-1111-1111-1111-111111111117', -- Navidad
    '11111111-1111-1111-1111-111111111118' -- Día especial profesional
  );

-- Aroma data
INSERT INTO
  aroma (id, name, description, olfative_pyramid, color)
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Calma Profunda',
    'Un aroma relajante y reconfortante.',
    '{"salida": "Lavanda, bergamota", "corazon": "Manzanilla, rosa blanca", "fondo": "Sándalo, almizcle"}',
    '#E0D7F6' -- Lavanda
  ),
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'Nube de Paz',
    'Una fragancia suave y serena.',
    '{"salida": "Té blanco", "corazon": "Peonía, flor de loto", "fondo": "Almizcle suave"}',
    '#F5F5F5' -- Default
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Vitalidad Cítrica',
    'Un aroma energizante y refrescante.',
    '{"salida": "Naranja, pomelo", "corazon": "Albahaca, jengibre", "fondo": "Vetiver ligero"}',
    '#E8F4D9' -- Cítrico
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'Menta Activa',
    'Una fragancia estimulante y revitalizante.',
    '{"salida": "Menta, eucalipto", "corazon": "Albahaca, romero", "fondo": "Cedro blanco"}',
    '#F5F5F5' -- Default (Menta not specified, could be #D9EDF7 if considered "brisa")
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    'Noche de Ámbar',
    'Un aroma cálido y sensual.',
    '{"salida": "Pimienta rosa", "corazon": "Rosa, jazmín", "fondo": "Ámbar, vainilla, almizcle"}',
    '#F5E6C8' -- Vainilla (due to "vainilla" in fondo and "ámbar" often associated with warm tones)
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    'Rosa Intensa',
    'Una fragancia floral y apasionada.',
    '{"salida": "Frambuesa, pimienta rosa", "corazon": "Rosa turca, peonía", "fondo": "Pachulí, almizcle"}',
    '#F9E0E3' -- Rosa
  ),
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    'Vainilla Especiada',
    'Un aroma dulce y especiado.',
    '{"salida": "Canela, clavo", "corazon": "Vainilla, jazmín", "fondo": "Resina, cuero suave"}',
    '#F5E6C8' -- Vainilla, Canela
  ),
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    'Alma Creativa',
    'Una fragancia inspiradora y vibrante.',
    '{"salida": "Jengibre, mandarina", "corazon": "Cedro, peonía", "fondo": "Ámbar suave"}',
    '#E8F4D9' -- Cítrico (Mandarina)
  ),
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    'Horizonte Azul',
    'Un aroma fresco y expansivo.',
    '{"salida": "Lavanda, bergamota", "corazon": "Notas marinas, menta", "fondo": "Madera blanca, almizcle"}',
    '#D9EDF7' -- Notas marinas
  ),
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    'Fuerza Noble',
    'Una fragancia poderosa y elegante.',
    '{"salida": "Incienso", "corazon": "Cedro, cuero suave", "fondo": "Vetiver, ámbar oscuro"}',
    '#E6D2B5' -- Cedro
  ),
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    'Bosque Interior',
    'Un aroma terroso y reconfortante.',
    '{"salida": "Hoja de higuera", "corazon": "Musgo, ciprés", "fondo": "Vetiver, madera húmeda"}',
    '#E6D2B5' -- Madera
  ),
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Raíces Vivas',
    'Una fragancia robusta y natural.',
    '{"salida": "Pino, eucalipto", "corazon": "Cedro, salvia", "fondo": "Vetiver profundo"}',
    '#E6D2B5' -- Cedro
  ),
  (
    '62eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    'Dulce Gratitud',
    'Un aroma suave y reconfortante.',
    '{"salida": "Mandarina", "corazon": "Peonía", "fondo": "Vainilla blanca"}',
    '#F5E6C8' -- Vainilla
  ),
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    'Lluvia de Flores',
    'Una fragancia fresca y floral.',
    '{"salida": "Pera", "corazon": "Flor de manzano, jazmín", "fondo": "Almizcle"}',
    '#F5E6F8' -- Floral, Jazmín
  ),
  (
    '84eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    'Fiesta Floral',
    'Un aroma alegre y festivo.',
    '{"salida": "Fresa", "corazon": "Rosa, lila", "fondo": "Caramelo suave"}',
    '#F9E0E3' -- Rosa, Floral
  ),
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    'Vainilla Alegre',
    'Una fragancia dulce y luminosa.',
    '{"salida": "Limón dulce", "corazon": "Flor de almendro", "fondo": "Vainilla, haba tonka"}',
    '#F5E6C8' -- Vainilla
  ),
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    'Corazón de Rosa',
    'Un aroma romántico y delicado.',
    '{"salida": "Rosa damascena", "corazon": "Peonía, lichi", "fondo": "Almizcle blanco"}',
    '#F9E0E3' -- Rosa
  ),
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    'Susurros de Vainilla',
    'Una fragancia cálida y acogedora.',
    '{"salida": "Pimienta rosa", "corazon": "Vainilla", "fondo": "Sándalo, haba tonka"}',
    '#F5E6C8' -- Vainilla
  ),
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
    'Romance Silvestre',
    'Un aroma natural y romántico.',
    '{"salida": "Cassis", "corazon": "Rosa silvestre, hojas verdes", "fondo": "Musgo blanco"}',
    '#F9E0E3' -- Rosa
  ),
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    'Luna de Almizcle',
    'Una fragancia misteriosa y sensual.',
    '{"salida": "Mandarina", "corazon": "Flor blanca", "fondo": "Almizcle, benjuí"}',
    '#F5E6F8' -- Floral (Flor blanca)
  );

-- Relaciones para CALIDEZ
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    '11111111-1111-1111-1111-111111111125'
  ), -- Noche de Ámbar -> Calidez
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    '11111111-1111-1111-1111-111111111125'
  ), -- Corazón de Rosa -> Calidez
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
    '11111111-1111-1111-1111-111111111125'
  ), -- Romance Silvestre -> Calidez
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111125'
  ), -- Luna de Almizcle -> Calidez
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111125'
  );

-- Susurros de Vainilla -> Calidez
-- Relaciones para FRESCURA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111126'
  ), -- Vitalidad Cítrica -> Frescura
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111126'
  ), -- Menta Activa -> Frescura
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111126'
  ), -- Horizonte Azul -> Frescura
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111126'
  ), -- Lluvia de Flores -> Frescura
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111126'
  );

-- Vainilla Alegre -> Frescura
-- Relaciones para LIMPIEZA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111127'
  ), -- Calma Profunda -> Limpieza
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111127'
  ), -- Nube de Paz -> Limpieza
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111127'
  ), -- Horizonte Azul -> Limpieza
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111127'
  ), -- Lluvia de Flores -> Limpieza
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111127'
  );

-- Alma Creativa -> Limpieza
-- Relaciones para CONEXIÓN CON LA NATURALEZA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111128'
  ), -- Bosque Interior -> Conexión con la naturaleza
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111128'
  ), -- Raíces Vivas -> Conexión con la naturaleza
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111128'
  ), -- Horizonte Azul -> Conexión con la naturaleza
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111128'
  ), -- Calma Profunda -> Conexión con la naturaleza
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111128'
  );

-- Menta Activa -> Conexión con la naturaleza
-- Relaciones para BIENESTAR / SPA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111129'
  ), -- Calma Profunda -> Bienestar / Spa
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111129'
  ), -- Nube de Paz -> Bienestar / Spa
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111129'
  ), -- Bosque Interior -> Bienestar / Spa
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111129'
  ), -- Horizonte Azul -> Bienestar / Spa
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111129'
  );

-- Luna de Almizcle -> Bienestar / Spa
-- Relaciones para CONCENTRACIÓN / CLARIDAD MENTAL
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111130'
  ), -- Menta Activa -> Concentración / Claridad mental
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111130'
  ), -- Alma Creativa -> Concentración / Claridad mental
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111130'
  ), -- Horizonte Azul -> Concentración / Claridad mental
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    '11111111-1111-1111-1111-111111111130'
  );

-- Fuerza Noble -> Concentración / Claridad mental
-- Relaciones para RELAJACIÓN / SUEÑO
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111131'
  ), -- Calma Profunda -> Relajación / Sueño
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111131'
  ), -- Nube de Paz -> Relajación / Sueño
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111131'
  ), -- Bosque Interior -> Relajación / Sueño
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111131'
  ), -- Luna de Almizcle -> Relajación / Sueño
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111131'
  );

-- Susurros de Vainilla -> Relajación / Sueño
-- Relaciones para SENSUALIDAD
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    '11111111-1111-1111-1111-111111111132'
  ), -- Noche de Ámbar -> Sensualidad
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    '11111111-1111-1111-1111-111111111132'
  ), -- Rosa Intensa -> Sensualidad
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    '11111111-1111-1111-1111-111111111132'
  ), -- Corazón de Rosa -> Sensualidad
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111132'
  ), -- Luna de Almizcle -> Sensualidad
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111132'
  );

-- Susurros de Vainilla -> Sensualidad
-- Relaciones para LIMPIEZA / PUREZA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111133'
  ), -- Calma Profunda -> Limpieza / Pureza
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111133'
  ), -- Nube de Paz -> Limpieza / Pureza
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111133'
  ), -- Horizonte Azul -> Limpieza / Pureza
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111133'
  ), -- Lluvia de Flores -> Limpieza / Pureza
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111133'
  );

-- Vainilla Alegre -> Limpieza / Pureza
-- Relaciones para ROMANTICISMO / TERNURA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    '11111111-1111-1111-1111-111111111134'
  ), -- Corazón de Rosa -> Romanticismo / Ternura
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
    '11111111-1111-1111-1111-111111111134'
  ), -- Romance Silvestre -> Romanticismo / Ternura
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111134'
  ), -- Susurros de Vainilla -> Romanticismo / Ternura
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111134'
  ), -- Luna de Almizcle -> Romanticismo / Ternura
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111134'
  );

-- Lluvia de Flores -> Romanticismo / Ternura
-- Relaciones para FRESCURA / LIMPIEZA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111135'
  ), -- Vitalidad Cítrica -> Frescura / Limpieza
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111135'
  ), -- Menta Activa -> Frescura / Limpieza
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111135'
  ), -- Horizonte Azul -> Frescura / Limpieza
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111135'
  ), -- Lluvia de Flores -> Frescura / Limpieza
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111135'
  );

-- Vainilla Alegre -> Frescura / Limpieza
-- Relaciones para ENERGÍA / VITALIDAD
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111136'
  ), -- Vitalidad Cítrica -> Energía / Vitalidad
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111136'
  ), -- Menta Activa -> Energía / Vitalidad
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111136'
  ), -- Alma Creativa -> Energía / Vitalidad
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    '11111111-1111-1111-1111-111111111136'
  ), -- Fuerza Noble -> Energía / Vitalidad
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111136'
  );

-- Raíces Vivas -> Energía / Vitalidad
-- Relaciones para SENSUALIDAD / RELAJACIÓN
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    '11111111-1111-1111-1111-111111111137'
  ), -- Noche de Ámbar -> Sensualidad / Relajación
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111137'
  ), -- Luna de Almizcle -> Sensualidad / Relajación
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111137'
  ), -- Susurros de Vainilla -> Sensualidad / Relajación
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111137'
  ), -- Calma Profunda -> Sensualidad / Relajación
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    '11111111-1111-1111-1111-111111111137'
  );

-- Corazón de Rosa -> Sensualidad / Relajación
-- Relaciones para LIMPIEZA / ORDEN
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111138'
  ), -- Menta Activa -> Limpieza / Orden
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111138'
  ), -- Horizonte Azul -> Limpieza / Orden
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111138'
  ), -- Calma Profunda -> Limpieza / Orden
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111138'
  ), -- Nube de Paz -> Limpieza / Orden
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111138'
  );

-- Lluvia de Flores -> Limpieza / Orden
-- Relaciones para FRESCURA NATURAL
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111139'
  ), -- Bosque Interior -> Frescura Natural
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111139'
  ), -- Raíces Vivas -> Frescura Natural
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111139'
  ), -- Horizonte Azul -> Frescura Natural
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111139'
  ), -- Menta Activa -> Frescura Natural
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111139'
  );

-- Vitalidad Cítrica -> Frescura Natural
-- Relaciones para CONEXIÓN / CALIDEZ FAMILIAR
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111140'
  ), -- Susurros de Vainilla -> Conexión / Calidez Familiar
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    '11111111-1111-1111-1111-111111111140'
  ), -- Vainilla Especiada -> Conexión / Calidez Familiar
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111140'
  ), -- Vainilla Alegre -> Conexión / Calidez Familiar
  (
    '62eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    '11111111-1111-1111-1111-111111111140'
  ), -- Dulce Gratitud -> Conexión / Calidez Familiar
  (
    '84eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    '11111111-1111-1111-1111-111111111140'
  );

-- Fiesta Floral -> Conexión / Calidez Familiar
-- Relaciones para ALEGRÍA / VITALIDAD
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111141'
  ), -- Vitalidad Cítrica -> Alegría / Vitalidad
  (
    '84eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    '11111111-1111-1111-1111-111111111141'
  ), -- Fiesta Floral -> Alegría / Vitalidad
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111141'
  ), -- Vainilla Alegre -> Alegría / Vitalidad
  (
    '62eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    '11111111-1111-1111-1111-111111111141'
  ), -- Dulce Gratitud -> Alegría / Vitalidad
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111141'
  );

-- Lluvia de Flores -> Alegría / Vitalidad
-- Relaciones para INSPIRACIÓN / CREATIVIDAD
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111142'
  ), -- Alma Creativa -> Inspiración / Creatividad
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111142'
  ), -- Horizonte Azul -> Inspiración / Creatividad
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111142'
  ), -- Bosque Interior -> Inspiración / Creatividad
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111142'
  ), -- Raíces Vivas -> Inspiración / Creatividad
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111142'
  );

-- Vitalidad Cítrica -> Inspiración / Creatividad
-- Relaciones para EQUILIBRIO / SERENIDAD
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111143'
  ), -- Calma Profunda -> Equilibrio / Serenidad
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111143'
  ), -- Nube de Paz -> Equilibrio / Serenidad
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111143'
  ), -- Bosque Interior -> Equilibrio / Serenidad
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    '11111111-1111-1111-1111-111111111143'
  ), -- Fuerza Noble -> Equilibrio / Serenidad
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111143'
  );

-- Susurros de Vainilla -> Equilibrio / Serenidad
-- Relaciones para RELAJADO
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111119'
  ), -- Calma Profunda -> Relajado
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111119'
  ), -- Nube de Paz -> Relajado
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111119'
  ), -- Bosque Interior -> Relajado
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111119'
  ), -- Susurros de Vainilla -> Relajado
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111119'
  );

-- Luna de Almizcle -> Relajado
-- Relaciones para ENERGÉTICO
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111120'
  ), -- Vitalidad Cítrica -> Energético
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111120'
  ), -- Menta Activa -> Energético
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111120'
  ), -- Alma Creativa -> Energético
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    '11111111-1111-1111-1111-111111111120'
  ), -- Fuerza Noble -> Energético
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111120'
  );

-- Raíces Vivas -> Energético
-- Relaciones para SENSUAL
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    '11111111-1111-1111-1111-111111111121'
  ), -- Noche de Ámbar -> Sensual
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    '11111111-1111-1111-1111-111111111121'
  ), -- Rosa Intensa -> Sensual
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    '11111111-1111-1111-1111-111111111121'
  ), -- Vainilla Especiada -> Sensual
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111121'
  ), -- Luna de Almizcle -> Sensual
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
    '11111111-1111-1111-1111-111111111121'
  );

-- Romance Silvestre -> Sensual
-- Relaciones para INSPIRADO
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111122'
  ), -- Alma Creativa -> Inspirado
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111122'
  ), -- Horizonte Azul -> Inspirado
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111122'
  ), -- Bosque Interior -> Inspirado
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111122'
  ), -- Raíces Vivas -> Inspirado
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111122'
  );

-- Vitalidad Cítrica -> Inspirado
-- Relaciones para SEGURO
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    '11111111-1111-1111-1111-111111111123'
  ), -- Fuerza Noble -> Seguro
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111123'
  ), -- Bosque Interior -> Seguro
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111123'
  ), -- Raíces Vivas -> Seguro
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111123'
  ), -- Calma Profunda -> Seguro
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111123'
  );

-- Susurros de Vainilla -> Seguro
-- Relaciones para CONECTADO A LA NATURALEZA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111124'
  ), -- Bosque Interior -> Conectado a la naturaleza
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111124'
  ), -- Raíces Vivas -> Conectado a la naturaleza
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111124'
  ), -- Horizonte Azul -> Conectado a la naturaleza
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111124'
  ), -- Calma Profunda -> Conectado a la naturaleza
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    '11111111-1111-1111-1111-111111111124'
  );

-- Menta Activa -> Conectado a la naturaleza
-- Relaciones para AGRADECIMIENTO
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '62eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    '11111111-1111-1111-1111-111111111111'
  ), -- Dulce Gratitud -> Agradecimiento
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111111'
  ), -- Lluvia de Flores -> Agradecimiento
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111111'
  ), -- Vainilla Alegre -> Agradecimiento
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    '11111111-1111-1111-1111-111111111111'
  ), -- Corazón de Rosa -> Agradecimiento
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111111'
  );

-- Susurros de Vainilla -> Agradecimiento
-- Relaciones para CUMPLEAÑOS
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '84eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    '11111111-1111-1111-1111-111111111112'
  ), -- Fiesta Floral -> Cumpleaños
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111112'
  ), -- Vainilla Alegre -> Cumpleaños
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    '11111111-1111-1111-1111-111111111112'
  ), -- Corazón de Rosa -> Cumpleaños
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    '11111111-1111-1111-1111-111111111112'
  ), -- Rosa Intensa -> Cumpleaños
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111112'
  );

-- Lluvia de Flores -> Cumpleaños
-- Relaciones para AMOR
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    '11111111-1111-1111-1111-111111111113'
  ), -- Corazón de Rosa -> Amor
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
    '11111111-1111-1111-1111-111111111113'
  ), -- Romance Silvestre -> Amor
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111113'
  ), -- Susurros de Vainilla -> Amor
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    '11111111-1111-1111-1111-111111111113'
  ), -- Luna de Almizcle -> Amor
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    '11111111-1111-1111-1111-111111111113'
  );

-- Noche de Ámbar -> Amor
-- Relaciones para CONDOLENCIAS
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111114'
  ), -- Calma Profunda -> Condolencias
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    '11111111-1111-1111-1111-111111111114'
  ), -- Nube de Paz -> Condolencias
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111114'
  ), -- Bosque Interior -> Condolencias
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111114'
  ), -- Horizonte Azul -> Condolencias
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111114'
  );

-- Lluvia de Flores -> Condolencias
-- Relaciones para GRAN NOTICIA
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111115'
  ), -- Vitalidad Cítrica -> Gran noticia
  (
    '84eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    '11111111-1111-1111-1111-111111111115'
  ), -- Fiesta Floral -> Gran noticia
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111115'
  ), -- Vainilla Alegre -> Gran noticia
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111115'
  ), -- Alma Creativa -> Gran noticia
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111115'
  );

-- Horizonte Azul -> Gran noticia
-- Relaciones para AMISTAD
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    '11111111-1111-1111-1111-111111111116'
  ), -- Vitalidad Cítrica -> Amistad
  (
    '84eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    '11111111-1111-1111-1111-111111111116'
  ), -- Fiesta Floral -> Amistad
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    '11111111-1111-1111-1111-111111111116'
  ), -- Vainilla Alegre -> Amistad
  (
    '62eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    '11111111-1111-1111-1111-111111111116'
  ), -- Dulce Gratitud -> Amistad
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    '11111111-1111-1111-1111-111111111116'
  );

-- Lluvia de Flores -> Amistad
-- Relaciones para NAVIDAD
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    '11111111-1111-1111-1111-111111111117'
  ), -- Vainilla Especiada -> Navidad
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    '11111111-1111-1111-1111-111111111117'
  ), -- Susurros de Vainilla -> Navidad
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    '11111111-1111-1111-1111-111111111117'
  ), -- Fuerza Noble -> Navidad
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    '11111111-1111-1111-1111-111111111117'
  ), -- Noche de Ámbar -> Navidad
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    '11111111-1111-1111-1111-111111111117'
  );

-- Bosque Interior -> Navidad
-- Relaciones para DÍA ESPECIAL PROFESIONAL
INSERT INTO
  aroma_intended_impacts_intended_impact ("aromaId", "intendedImpactId")
VALUES
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    '11111111-1111-1111-1111-111111111118'
  ), -- Fuerza Noble -> Día especial profesional
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    '11111111-1111-1111-1111-111111111118'
  ), -- Alma Creativa -> Día especial profesional
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    '11111111-1111-1111-1111-111111111118'
  ), -- Horizonte Azul -> Día especial profesional
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '11111111-1111-1111-1111-111111111118'
  ), -- Raíces Vivas -> Día especial profesional
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '11111111-1111-1111-1111-111111111118'
  );

-- Calma Profunda -> Día especial profesional
INSERT INTO
  container (
    id,
    name,
    description,
    image_url,
    base_price,
    dimensions
  )
VALUES
  (
    'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380d11',
    'Contenedor Pequeño',
    'Contenedor cilíndrico de 8cm de diámetro x 10cm de alto, ideal para velas pequeñas o muestras',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748435430/IMG_8441-247x300_pk5ib2.jpg',
    12000.00,
    '{"height": 10, "width": 8, "depth": 8}'
  ),
  (
    'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380d12',
    'Contenedor Mediano',
    'Contenedor cilíndrico de 10cm de diámetro x 10cm de alto, tamaño estándar para velas aromáticas',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748435469/IMG_5197-300x300_wyh7kv.jpg',
    18000.00,
    '{"height": 10, "width": 10, "depth": 10}'
  );

-- Insert template labels
INSERT INTO
  "label" (
    id,
    name,
    description,
    image_url,
    type,
    "isActive"
  )
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Floral Elegante',
    'Etiqueta con diseño floral elegante en tonos pastel',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748583923/floral_jkbye0.jpg',
    'template',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111112',
    'Minimalista Moderno',
    'Diseño minimalista y moderno con líneas limpias',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748583923/minimalista_uc2v9p.jpg',
    'template',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111113',
    'Vintage Clásico',
    'Etiqueta con estilo vintage y elementos clásicos',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748583923/vintage_wxcszb.jpg',
    'template',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111114',
    'Geométrico Abstracto',
    'Diseño geométrico con formas abstractas coloridas',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748583923/geometrico_a3rwn5.jpg',
    'template',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111115',
    'Natural Orgánico',
    'Etiqueta con elementos naturales y orgánicos',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748583929/organico_k9ymiq.jpg',
    'template',
    true
  );

-- Actualizar el script de inserción con los UserId de los clientes
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
    "labelId",
    "modelUrl"
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
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748584940/1_nyynho.png',
    '11111111-1111-1111-1111-111111111113', -- Client One
    '11111111-1111-1111-1111-111111111111',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748546484/free_frosted_glass_candle_low_poly_blank_label_ssrsrx.glb'
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
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748584969/2_bwxzql.jpg',
    '11111111-1111-1111-1111-111111111114', -- Client Two
    '11111111-1111-1111-1111-111111111112',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748546484/free_frosted_glass_candle_low_poly_blank_label_ssrsrx.glb'
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
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748584987/3_wth5ax.jpg',
    '11111111-1111-1111-1111-111111111113', -- Client One
    '11111111-1111-1111-1111-111111111113',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748546484/free_frosted_glass_candle_low_poly_blank_label_ssrsrx.glb'
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
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748585008/4_uwczob.jpg',
    '11111111-1111-1111-1111-111111111114', -- Client Two
    '11111111-1111-1111-1111-111111111114',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748546484/free_frosted_glass_candle_low_poly_blank_label_ssrsrx.glb'
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
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748585029/5_u4fir6.jpg',
    '11111111-1111-1111-1111-111111111113', -- Client One
    '11111111-1111-1111-1111-111111111115',
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748546484/free_frosted_glass_candle_low_poly_blank_label_ssrsrx.glb'
  );

INSERT INTO
  gift (id, name, description, "base_price", image_url)
VALUES
  (
    'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c11',
    'Chocolates',
    'Exquisita selección de chocolates artesanales con sabores tropicales',
    45000,
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748387579/aromalife/gifts/yrhjcy0hdwiycjmsu9ao.png'
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c12',
    'Flores',
    'Hermoso arreglo floral con variedades locales de temporada',
    65000,
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748444380/e79b6c8f63d4512cead849700fb9d7bc_480x480_xl5sed.jpg'
  ),
  (
    'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380c13',
    'Sales para baño/tina',
    'Sales minerales relajantes con esencias naturales para spa en casa',
    38000,
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748444979/Captura_de_pantalla_2025-05-28_100532_s3uyxx.png'
  ),
  (
    'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380c14',
    'Vino',
    'Fino vino de la mejor cosecha colombiana, ideal para celebrar',
    85000,
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748444978/Captura_de_pantalla_2025-05-28_100500_qbgtqe.png'
  ),
  (
    'c5eebc99-9c0b-4ef8-bb6d-6bb9bd380c15',
    'Imagen Virgen',
    'Artística representación de la Virgen María en madera tallada',
    55000,
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748444979/Captura_de_pantalla_2025-05-28_100600_e51jyw.png'
  ),
  (
    'c6eebc99-9c0b-4ef8-bb6d-6bb9bd380c16',
    'Jabones en glicerina',
    'Jabones artesanales de glicerina con aromas naturales y diseños únicos',
    32000,
    'https://res.cloudinary.com/dti5zalsf/image/upload/v1748444979/Captura_de_pantalla_2025-05-28_100518_kbukn8.png'
  );

-- Agregando dos carritos, uno para cada cliente registrado
INSERT INTO
  cart (id, "userId", "checkedOut")
VALUES
  (
    '22222222-2222-2222-2222-222222222221',
    '11111111-1111-1111-1111-111111111113', -- Client One
    false
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111114', -- Client Two
    false
  );

-- Agregando cart-items con datos existentes
INSERT INTO
  cart_item (
    id,
    "cartId",
    "candleId",
    quantity,
    "unitPrice",
    "totalPrice"
  )
VALUES
  (
    '33333333-3333-3333-3333-333333333331',
    '22222222-2222-2222-2222-222222222221', -- Cart for Client One
    '11111111-1111-1111-1111-111111111111', -- Vela Relajante
    2,
    25000,
    50000
  ),
  (
    '33333333-3333-3333-3333-333333333332',
    '22222222-2222-2222-2222-222222222222', -- Cart for Client Two
    '11111111-1111-1111-1111-111111111112', -- Vela Cítrica Pequeña
    1,
    26000,
    26000
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222221', -- Cart for Client One
    '11111111-1111-1111-1111-111111111113', -- Vela Floral Mediana
    3,
    32000,
    96000
  ),
  (
    '33333333-3333-3333-3333-333333333334',
    '22222222-2222-2222-2222-222222222222', -- Cart for Client Two
    '11111111-1111-1111-1111-111111111114', -- Vela Relajante Mediana
    1,
    34000,
    34000
  );

-- Agregando dos órdenes, una para cada cliente registrado
INSERT INTO
  "order" (
    id,
    "userId",
    "totalAmount",
    "shippingAddress",
    "status",
    "paymentDetails"
  )
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

-- Agregando el atributo GiftId para los regalos
INSERT INTO
  order_item (
    id,
    "orderId",
    "candleId",
    "giftId",
    quantity,
    "unitPrice",
    "totalPrice"
  )
VALUES
  (
    '44444444-4444-4444-4444-444444444441',
    '55555555-5555-5555-5555-555555555551', -- Order for Client One
    '11111111-1111-1111-1111-111111111111', -- Vela Relajante
    NULL, -- No gift
    2,
    25000,
    50000
  ),
  (
    '44444444-4444-4444-4444-444444444442',
    '55555555-5555-5555-5555-555555555552', -- Order for Client Two
    '11111111-1111-1111-1111-111111111112', -- Vela Cítrica Pequeña
    'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c11', -- Chocolates
    1,
    26000,
    26000
  ),
  (
    '44444444-4444-4444-4444-444444444443',
    '55555555-5555-5555-5555-555555555551', -- Order for Client One
    '11111111-1111-1111-1111-111111111113', -- Vela Floral Mediana
    NULL, -- No gift
    3,
    32000,
    96000
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555552', -- Order for Client Two
    '11111111-1111-1111-1111-111111111114', -- Vela Relajante Mediana
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c12', -- Flores
    1,
    34000,
    34000
  );

-- Agregando dos reviews, una para cada cliente con su respectiva orden
INSERT INTO
  review (id, content, rating, "orderId")
VALUES
  (
    '77777777-7777-7777-7777-777777777771',
    'Excelente calidad y aroma. Muy satisfecho con la compra.',
    5,
    '55555555-5555-5555-5555-555555555551' -- Order for Client One
  ),
  (
    '77777777-7777-7777-7777-777777777772',
    'El producto llegó a tiempo y en perfectas condiciones. Muy recomendado.',
    4,
    '55555555-5555-5555-5555-555555555552' -- Order for Client Two
  );