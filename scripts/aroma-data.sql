INSERT INTO
  aroma (
    id,
    name,
    description,
    olfative_pyramid,
    image_url,
    color
  )
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Calma Profunda',
    'Un aroma relajante y reconfortante.',
    '{"salida": "Lavanda, bergamota", "corazon": "Manzanilla, rosa blanca", "fondo": "Sándalo, almizcle"}',
    'https://example.com/calma-profunda.jpg',
    '#E0D7F6' -- Lavanda
  ),
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'Nube de Paz',
    'Una fragancia suave y serena.',
    '{"salida": "Té blanco", "corazon": "Peonía, flor de loto", "fondo": "Almizcle suave"}',
    'https://example.com/nube-de-paz.jpg',
    '#F5F5F5' -- Default
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Vitalidad Cítrica',
    'Un aroma energizante y refrescante.',
    '{"salida": "Naranja, pomelo", "corazon": "Albahaca, jengibre", "fondo": "Vetiver ligero"}',
    'https://example.com/vitalidad-citrica.jpg',
    '#E8F4D9' -- Cítrico
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'Menta Activa',
    'Una fragancia estimulante y revitalizante.',
    '{"salida": "Menta, eucalipto", "corazon": "Albahaca, romero", "fondo": "Cedro blanco"}',
    'https://example.com/menta-activa.jpg',
    '#F5F5F5' -- Default (Menta not specified, could be #D9EDF7 if considered "brisa")
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    'Noche de Ámbar',
    'Un aroma cálido y sensual.',
    '{"salida": "Pimienta rosa", "corazon": "Rosa, jazmín", "fondo": "Ámbar, vainilla, almizcle"}',
    'https://example.com/noche-de-ambar.jpg',
    '#F5E6C8' -- Vainilla (due to "vainilla" in fondo and "ámbar" often associated with warm tones)
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    'Rosa Intensa',
    'Una fragancia floral y apasionada.',
    '{"salida": "Frambuesa, pimienta rosa", "corazon": "Rosa turca, peonía", "fondo": "Pachulí, almizcle"}',
    'https://example.com/rosa-intensa.jpg',
    '#F9E0E3' -- Rosa
  ),
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    'Vainilla Especiada',
    'Un aroma dulce y especiado.',
    '{"salida": "Canela, clavo", "corazon": "Vainilla, jazmín", "fondo": "Resina, cuero suave"}',
    'https://example.com/vainilla-especiada.jpg',
    '#F5E6C8' -- Vainilla, Canela
  ),
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    'Alma Creativa',
    'Una fragancia inspiradora y vibrante.',
    '{"salida": "Jengibre, mandarina", "corazon": "Cedro, peonía", "fondo": "Ámbar suave"}',
    'https://example.com/alma-creativa.jpg',
    '#E8F4D9' -- Cítrico (Mandarina)
  ),
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    'Horizonte Azul',
    'Un aroma fresco y expansivo.',
    '{"salida": "Lavanda, bergamota", "corazon": "Notas marinas, menta", "fondo": "Madera blanca, almizcle"}',
    'https://example.com/horizonte-azul.jpg',
    '#D9EDF7' -- Notas marinas
  ),
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    'Fuerza Noble',
    'Una fragancia poderosa y elegante.',
    '{"salida": "Incienso", "corazon": "Cedro, cuero suave", "fondo": "Vetiver, ámbar oscuro"}',
    'https://example.com/fuerza-noble.jpg',
    '#E6D2B5' -- Cedro
  ),
  (
    '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    'Bosque Interior',
    'Un aroma terroso y reconfortante.',
    '{"salida": "Hoja de higuera", "corazon": "Musgo, ciprés", "fondo": "Vetiver, madera húmeda"}',
    'https://example.com/bosque-interior.jpg',
    '#E6D2B5' -- Madera
  ),
  (
    '51eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Raíces Vivas',
    'Una fragancia robusta y natural.',
    '{"salida": "Pino, eucalipto", "corazon": "Cedro, salvia", "fondo": "Vetiver profundo"}',
    'https://example.com/raices-vivas.jpg',
    '#E6D2B5' -- Cedro
  ),
  (
    '62eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    'Dulce Gratitud',
    'Un aroma suave y reconfortante.',
    '{"salida": "Mandarina", "corazon": "Peonía", "fondo": "Vainilla blanca"}',
    'https://example.com/dulce-gratitud.jpg',
    '#F5E6C8' -- Vainilla
  ),
  (
    '73eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    'Lluvia de Flores',
    'Una fragancia fresca y floral.',
    '{"salida": "Pera", "corazon": "Flor de manzano, jazmín", "fondo": "Almizcle"}',
    'https://example.com/lluvia-de-flores.jpg',
    '#F5E6F8' -- Floral, Jazmín
  ),
  (
    '84eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    'Fiesta Floral',
    'Un aroma alegre y festivo.',
    '{"salida": "Fresa", "corazon": "Rosa, lila", "fondo": "Caramelo suave"}',
    'https://example.com/fiesta-floral.jpg',
    '#F9E0E3' -- Rosa, Floral
  ),
  (
    '95eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    'Vainilla Alegre',
    'Una fragancia dulce y luminosa.',
    '{"salida": "Limón dulce", "corazon": "Flor de almendro", "fondo": "Vainilla, haba tonka"}',
    'https://example.com/vainilla-alegre.jpg',
    '#F5E6C8' -- Vainilla
  ),
  (
    '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
    'Corazón de Rosa',
    'Un aroma romántico y delicado.',
    '{"salida": "Rosa damascena", "corazon": "Peonía, lichi", "fondo": "Almizcle blanco"}',
    'https://example.com/corazon-de-rosa.jpg',
    '#F9E0E3' -- Rosa
  ),
  (
    '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
    'Susurros de Vainilla',
    'Una fragancia cálida y acogedora.',
    '{"salida": "Pimienta rosa", "corazon": "Vainilla", "fondo": "Sándalo, haba tonka"}',
    'https://example.com/susurros-de-vainilla.jpg',
    '#F5E6C8' -- Vainilla
  ),
  (
    '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
    'Romance Silvestre',
    'Un aroma natural y romántico.',
    '{"salida": "Cassis", "corazon": "Rosa silvestre, hojas verdes", "fondo": "Musgo blanco"}',
    'https://example.com/romance-silvestre.jpg',
    '#F9E0E3' -- Rosa
  ),
  (
    '39eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
    'Luna de Almizcle',
    'Una fragancia misteriosa y sensual.',
    '{"salida": "Mandarina", "corazon": "Flor blanca", "fondo": "Almizcle, benjuí"}',
    'https://example.com/luna-de-almizcle.jpg',
    '#F5E6F8' -- Floral (Flor blanca)
  );