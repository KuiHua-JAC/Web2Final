require("dotenv").config();
const app = require("./app.js");
const port = 1339;
const { initialize } = require("./mongodb-initialize.js");
const url =
  process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;

initialize("AutoFinder", url).then(
  app.listen(port) // Run the server
);

// MONGODB_PWD="foqjoj-denMe0-morged"
// URL_PRE ="mongodb+srv://mongoose:"
// URL_POST="@webiiasg1.xz3pud8.mongodb.net/?retryWrites=true&w=majority"
