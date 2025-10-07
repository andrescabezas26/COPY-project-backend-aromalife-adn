-- Agregando dos reviews, una para cada cliente con su respectiva orden
INSERT INTO review (id, content, rating, "orderId")
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