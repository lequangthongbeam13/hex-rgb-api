# hex-rgb-api

A small JavaScript library that converts hex color codes to RGB, and an Express REST API that uses it. The project is mainly about testing: unit tests for the library and integration tests for the API route, written with Mocha, Chai and Supertest.

Exercise III, Software Testing (AT00CK37), LAB University of Applied Sciences.

## Requirements

- Node.js 20.19 or newer
- npm

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

Convert a color (the `#` is optional, but in a URL it must be written as `%23`):

```bash
curl "http://localhost:3000/api/hex-to-rgb?hex=ff8800"
# {"hex":"ff8800","rgb":{"r":255,"g":136,"b":0}}
```

| Request | Status | Response |
|---|---|---|
| `?hex=ff8800`, `?hex=%23ff8800`, `?hex=f80` | 200 | `{ "hex": ..., "rgb": { "r", "g", "b" } }` |
| `?hex=zzzzzz` (invalid) | 400 | `{ "error": "Invalid hex color: zzzzzz" }` |
| no `hex` parameter | 400 | `{ "error": "Query parameter 'hex' is required" }` |

## Running the tests

```bash
npm test                  # all tests
npm run test:unit         # library only
npm run test:integration  # API route only
```

## Project structure

```
src/hexToRgb.js         library (one function)
src/app.js              Express app and route
src/server.js           starts the server
test/hexToRgb.test.js   unit tests
test/api.test.js        integration tests
```

## Maintainer

Quang Thong Le
