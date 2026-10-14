// server.js

const app = require("./app");

/** Port for the development server. */
const PORT = 3000;

/**
 * Starts the REST API server.
 * Run with: npm start
 */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
