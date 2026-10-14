// hexToRgb.js

/**
 * Converts a hex color code to an RGB object.
 *
 * Accepted formats (case-insensitive, "#" is optional):
 *  - 6 digits, e.g. "#ff8800" or "ff8800"
 *  - 3 digits (shorthand), e.g. "#f80", which means "#ff8800"
 *
 * @param {string} hex - The hex color code to convert.
 * @returns {{r: number, g: number, b: number}} The red, green and blue values (0-255).
 * @throws {TypeError} If hex is not a string.
 * @throws {Error} If hex is not a valid 3 or 6 digit hex color.
 */
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("Input must be a string");
  }

  // Remove spaces around the value and one leading "#".
  let value = hex.trim().replace(/^#/, "");

  // Only 3 or 6 characters from 0-9 and a-f are allowed.
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  // Expand shorthand: "f80" becomes "ff8800".
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Each pair of characters is one color channel in base 16.
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

/**
 * Hex to RGB conversion library.
 *
 * @module hexToRgb
 */
module.exports = { hexToRgb };
