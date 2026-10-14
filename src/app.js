// app.js

const express = require("express");
const { hexToRgb } = require("./hexToRgb");

/**
 * Express application with one API route.
 * The app is exported without calling listen(), so the
 * integration tests can use it directly with Supertest.
 */
const app = express();

/**
 * GET /api/hex-to-rgb?hex=<hex color>
 * Converts a hex color code to RGB by calling the hexToRgb library.
 *
 * Note about "#":
 *  - "#" is optional, so ?hex=ff8800 works without any encoding.
 *  - In a URL, "#" starts the fragment, and the part after it is
 *    never sent to the server. ?hex=#ff8800 arrives as an empty hex (400).
 *  - To send "#", encode it as %23: ?hex=%23ff8800. Express decodes
 *    it back to "#ff8800" before the route reads req.query.hex.
 *
 * @param {string} req.query.hex - The hex color, e.g. "ff8800" or "%23ff8800".
 * @returns {object} 200 with JSON { hex, rgb: { r, g, b } } on success,
 *   400 with JSON { error } if hex is missing or invalid.
 */
app.get("/api/hex-to-rgb", (req, res) => {
  const { hex } = req.query;

  if (hex === undefined || hex === "") {
    return res.status(400).json({ error: "Query parameter 'hex' is required" });
  }

  try {
    const rgb = hexToRgb(hex);
    return res.status(200).json({ hex, rgb });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = app;
