// api.test.js

const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const { hexToRgb } = require("../src/hexToRgb");

/**
 * Integration tests for the GET /api/hex-to-rgb route.
 * Supertest sends real HTTP requests to the Express app, so these
 * tests check the route, the query parsing, the library call and
 * the JSON response together.
 */
describe("GET /api/hex-to-rgb integration tests", () => {
  /** Happy path: status, content type and body. */
  it("returns 200 and JSON with the RGB values", async () => {
    const res = await request(app).get("/api/hex-to-rgb?hex=ff8800");
    expect(res.status).to.equal(200);
    expect(res.headers["content-type"]).to.include("application/json");
    expect(res.body).to.deep.equal({ hex: "ff8800", rgb: { r: 255, g: 136, b: 0 } });
  });

  /** "#" must be sent as %23 in a URL. The route must decode it correctly. */
  it("accepts a URL-encoded # (%23)", async () => {
    const res = await request(app).get("/api/hex-to-rgb?hex=%23ff8800");
    expect(res.status).to.equal(200);
    expect(res.body.rgb).to.deep.equal({ r: 255, g: 136, b: 0 });
  });

  /** The route must return the same result as the library function. */
  it("returns the same result as the library for shorthand input", async () => {
    const res = await request(app).get("/api/hex-to-rgb?hex=f80");
    expect(res.status).to.equal(200);
    expect(res.body.rgb).to.deep.equal(hexToRgb("f80"));
  });

  /** Error path: the library throws, the route must answer 400, not crash. */
  it("returns 400 and an error message for an invalid hex", async () => {
    const res = await request(app).get("/api/hex-to-rgb?hex=zzzzzz");
    expect(res.status).to.equal(400);
    expect(res.body.error).to.include("Invalid hex color");
  });

  /** Error path: the query parameter is missing. */
  it("returns 400 if the hex parameter is missing", async () => {
    const res = await request(app).get("/api/hex-to-rgb");
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Query parameter 'hex' is required");
  });

  /** A route that does not exist returns 404. */
  it("returns 404 for an unknown route", async () => {
    const res = await request(app).get("/api/rgb-to-hex");
    expect(res.status).to.equal(404);
  });
});
