// hexToRgb.test.js

const { expect } = require("chai");
const { hexToRgb } = require("../src/hexToRgb");

/**
 * Unit tests for the hexToRgb() library function.
 * The function is called directly, without the web server.
 */
describe("hexToRgb() unit tests", () => {
  /** Valid input: the normal 6 digit format with "#". */
  it("converts a 6 digit hex with # to RGB", () => {
    expect(hexToRgb("#ff8800")).to.deep.equal({ r: 255, g: 136, b: 0 });
  });

  /** Valid input: "#" is optional. */
  it("converts a 6 digit hex without #", () => {
    expect(hexToRgb("00ff00")).to.deep.equal({ r: 0, g: 255, b: 0 });
  });

  /** Valid input: upper case letters give the same result. */
  it("accepts upper case letters", () => {
    expect(hexToRgb("#FF8800")).to.deep.equal(hexToRgb("#ff8800"));
  });

  /** Valid input: 3 digit shorthand is expanded ("f80" -> "ff8800"). */
  it("expands 3 digit shorthand", () => {
    expect(hexToRgb("#f80")).to.deep.equal({ r: 255, g: 136, b: 0 });
  });

  /** Boundary values: the smallest and largest colors. */
  it("handles boundary values black and white", () => {
    expect(hexToRgb("#000000")).to.deep.equal({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#ffffff")).to.deep.equal({ r: 255, g: 255, b: 255 });
  });

  /** Invalid input: characters outside 0-9 and a-f. */
  it("throws an error for invalid characters", () => {
    expect(() => hexToRgb("#zz8800")).to.throw("Invalid hex color");
  });

  /** Invalid input: wrong length (not 3 or 6 digits). */
  it("throws an error for a wrong length", () => {
    expect(() => hexToRgb("#ff88")).to.throw("Invalid hex color");
  });

  /** Invalid input: a value that is not a string. */
  it("throws a TypeError if input is not a string", () => {
    expect(() => hexToRgb(123456)).to.throw(TypeError, "Input must be a string");
  });
});
