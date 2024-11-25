function add(a: number, b: number): number {
  return a + b;
}

describe('add function', () => {
  it('should return the sum of two numbers', () => {
    const result = add(1, 2);
    expect(result).toBe(3);
  });
});
