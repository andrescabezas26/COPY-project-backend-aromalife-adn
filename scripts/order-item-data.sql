-- Agregando el atributo GiftId para los regalos
INSERT INTO order_item (id, "orderId", "candleId", "giftId", quantity, "unitPrice", "totalPrice")
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