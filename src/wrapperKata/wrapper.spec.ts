import { Wrapper } from './wrapper';

describe("Wrapper Kata", () => {
  it("Should not wrap an empty text", () => {
    expect(Wrapper.wrap("", 0)).toBe("");
  });

  it("Should not wrap a text without column width", () => {
    const expectedResult = "hello";
    expect(Wrapper.wrap(expectedResult, 0)).toBe(expectedResult);
  });

  it("Should not wrap an empty text with column width", () => {
    const expectedResult = "";
    expect(Wrapper.wrap(expectedResult, 4)).toBe(expectedResult);
  });

  it.each([
    ["short", 1, "s\nh\no\nr\nt"],
    ["short", 2, "sh\nor\nt"],
    ["short", 4, "shor\nt"],
  ])("Should wrap a text with column width", () => {
    const expectedResult = `he\nll\no`;
    expect(Wrapper.wrap("hello", 2)).toBe(expectedResult);
  });

  it("Should not wrap with column width bigger than the text", () => {
    expect(Wrapper.wrap("text", 15)).toBe("text");
  });

  it("Should not wrap width negative column with", () => {
    expect(Wrapper.wrap("negativeColumnWidth", -4)).toBe("negativeColumnWidth");
  });
});
