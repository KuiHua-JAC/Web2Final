require("dotenv").config();
const app = require("./app.js");
const port = 1339;
const { initialize } = require("./dbConnection.js");
const url =
  process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;

initialize("AutoFinder", url).then(
  app.listen(port) // Run the server
);
