-- Agregando dos carritos, uno para cada cliente registrado
INSERT INTO cart (id, "userId", "checkedOut")
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