const { MongoMemoryServer } = require("mongodb-memory-server");
const carModel = require("../carModel.js");
const logger = require("../../logger.js");
const app = require("../../app.js")
const supertest = require("supertest");
const testRequest = supertest(app);

require("dotenv").config();
jest.setTimeout(5000);
let mongod;

beforeAll(async () => {
    // This will create a new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryServer.create();
    logger.info("Mock Database started");
  });
  
  afterAll(async () => {
    await mongod.stop(); // Stop the MongoMemoryServer
    logger.info("Mock Database stopped");
  });

  /**  Runs before each test to make sure that the database is empty but ready */
beforeEach(async () => {
    try {
      const url = mongod.getUri();
      await model.initialize(db, true, url);
    } catch (err) {
      logger.error(err.message);
    }
  });
  
  afterEach(async () => {
    try {
      await model.close();
    } catch (err) {
      logger.error(err.message);
    }
  });