const express = require("express");
const router = express.Router();
const routeRoot = "/";

// If anything else than "/" is hit
router.all("*", (request, response) => {
  response.status(404);
  response.send("Uncaught error");
});

module.exports = {
  router,
  routeRoot,
};
