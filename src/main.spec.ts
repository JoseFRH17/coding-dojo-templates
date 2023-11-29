import { Main } from './main';

describe.skip("Default test", () => {
  it("should work", () => {
    const main = new Main("Hello world");
    expect(main.getParam()).toBe("Hello world");
  });
});
