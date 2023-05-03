const express = require("express");
const router = express.Router();
const routeRoot = "/";

router.get("/", (request, response) => {
  response.send("<b>Welcome to the car review website</b>");
});

module.exports = {
  router,
  routeRoot,
};
