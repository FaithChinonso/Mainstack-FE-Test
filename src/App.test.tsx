test("adds 1 + 2 to equal 3", () => {
  function sum(a: any, b: any) {
    return a + b;
  }
  expect(sum(1, 2)).toBe(3);
});
