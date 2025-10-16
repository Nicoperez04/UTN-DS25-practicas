// Lo hago para ver q Jest corre bien
describe('Smoke', () => {
  test('jest corre OK', () => {
    // ARRANGE: nada
    // ACT
    const suma = 2 + 2;
    // ASSERT
    expect(suma).toBe(4);
  });
});
