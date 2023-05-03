const { MongoMemoryServer } = require("mongodb-memory-server");
const model = require("../models/carReviewModelMongoDb");
const db = "carReview_db_test";
const logger = require("../logger");
const app = require("../app");
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

//////////////////////////////////////////////////////////////////////
//POST
//////////////////////////////////////////////////////////////////////

test("POST /reviews success case", async () => {
  const testResponse = await testRequest.post("/reviews").send({
    title: "Toyota",
    description: "Normal",
    score: 3,
  });
  expect(testResponse.status).toBe(200);
});

test("POST /reviews failure case, when it's user error", async () => {
  const testResponse = await testRequest.post("/reviews").send({
    title: "Toyota",
    description: "Normal",
    score: 333,
  });
  expect(testResponse.status).toBe(400);
});

////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////
test("GET /reviews failure case, when it's database error (not found)", async () => {
  const testResponse = await testRequest.get("/reviews/2");
  expect(testResponse.status).toBe(500);
});

test("GET /reviews success case for get one", async () => {
  await model.addCarReview("toyota", "description", 3);
  const testResponse = await testRequest.get("/reviews/3");
  expect(testResponse.status).toBe(200);
});

//////////////////////////////////////////////////////////////////////
//PUT
//////////////////////////////////////////////////////////////////////

test("PUT /reviews success case", async () => {
  await model.addCarReview("toyota", "description", 3);
  const testResponse = await testRequest.put("/reviews/toyota").send({
    score: 5,
  });
  expect(testResponse.status).toBe(200);
});

test("PUT /reviews failure case, when it's user error", async () => {
  await model.addCarReview("toyota", "description", 3);
  const testResponse = await testRequest.put("/reviews/toyota").send({
    score: 10,
  });
  expect(testResponse.status).toBe(400);
});

test("PUT /reviews failure case, when it's database error (not found)", async () => {
  const testResponse = await testRequest.put("/reviews/toyota").send({
    score: 5,
  });
  expect(testResponse.status).toBe(500);
});

//////////////////////////////////////////////////////////////////////
//DELETE
//////////////////////////////////////////////////////////////////////

test("DELETE /reviews success case", async () => {
  await model.addCarReview("toyota", "description", 3);
  const testResponse = await testRequest.delete("/reviews/toyota");
  expect(testResponse.status).toBe(200);
});

test("DELETE /reviews failure case, when it's database error (not found)", async () => {
  const testResponse = await testRequest.delete("/reviews/toyota");
  expect(testResponse.status).toBe(500);
});

//////////////////////////////////////////////////////////////////////
//Random endpoint testing
//////////////////////////////////////////////////////////////////////
test("Endpoints that don't exist should throw a 404 error", async () => {
  const testResponse = await testRequest.get("/sdfsfdsdfds");
  expect(testResponse.status).toBe(404);
});
