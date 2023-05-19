const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");
const pinohttp = require("pino-http");
const httpLogger = pinohttp({
  logger: logger,
});
app.use(httpLogger);

// Make sure errorController is last!
const controllers = ["carReview","car","user","session", "error" ];

app.use(cors());
app.use(express.json());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register routes from all controllers
//  (Assumes a flat directory structure and common
// 'routeRoot' / 'router' export)
/**
 * Kui Hua's code
 *  */
controllers.forEach((controllerName) => {
  try {
    const controllerRoutes = require(`./${controllerName}/` +
      `${controllerName}Controller.js`);
    app.use(controllerRoutes.routeRoot, controllerRoutes.router);
    1;
  } catch (error) {
    logger.error(error);
    throw error; // We could fail gracefully, but this
    //  would hide bugs later on.
  }
});
const listEndpoints = require("express-list-endpoints");
logger.info(listEndpoints(app));

module.exports = app;
