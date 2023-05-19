const { MongoMemoryServer } = require("mongodb-memory-server");
const carModel = require("../carModel.js");
const logger = require("../../logger.js");
const app = require("../../app.js")
const supertest = require("supertest");
const testRequest = supertest(app);
const db = "car_db_test";
const {
  getCarReviewCollection,
  getCarCollection,
  getUserCollection,
  initialize,
  close
} = require("../../dbConnection.js");

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
      await initialize(db, url);
    } catch (err) {
      logger.error(err.message);
    }
  });
  
  afterEach(async () => {
    try {
      await close();
    } catch (err) {
      logger.error(err.message);
    }
  });

  //POST

  test("POST /cars success case", async () => {
    const testResponse = await testRequest.post("/cars").send({
      make: "Toyota",
      model: "Camry",
      year: 2014,
      description:"description",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    });
    expect(testResponse.status).toBe(200);
  });

  test("POST /cars failure case, when it's user error", async () => {
    const testResponse = await testRequest.post("/reviews").send({
      make: "Toyota",
      model: "Camry",
      year: 2077,
      description:"description",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    });
    expect(testResponse.status).toBe(400);
  });

  // GET

  test("GET /cars success case for get one", async () => {
    await carModel.addCar("Toyota", "camry", 2014,"description","https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    const testResponse = await testRequest.get("/cars/Toyota/camry/2014");
    expect(testResponse.status).toBe(200);
  });

  test("GET /cars failure case, when it's database error (not found)", async () => {
    const testResponse = await testRequest.get("/cars/Honda/Accord/2018");
    expect(testResponse.status).toBe(500);
  });

  //PUT

  test("PUT /cars success case", async () => {
    await carModel.addCar("Toyota", "Prius", 2005,"description","https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    const testResponse = await testRequest.put("/cars/Toyota/Prius/2005").send({
      make: "Toyota",
      model: "Camry",
      year: 2005,
      description:"description",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    });
    expect(testResponse.status).toBe(200);
  });

  test("PUT /cars failure case, when it's user error", async () => {
    await carModel.addCar("Honda", "Odyssey", 2016,"description","https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    const testResponse = await testRequest.put("/cars/Honda/Odyssey/2016").send({
      make: "Honda",
      model: "Accord",
      year: 2077,
      description:"description",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    });
    expect(testResponse.status).toBe(400);
  }); 

  test("PUT /cars failure case, when it's database error", async () => {
    await carModel.addCar("Honda", "Odyssey", 2016,"description","https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    const testResponse = await testRequest.put("/cars/Honda/Odysssey/2016").send({
      make: "Honda",
      model: "Accord",
      year: 2015,
      description:"description",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    });
    expect(testResponse.status).toBe(400);
  }); 

//DELETE

test("DELETE /cars success case", async () => {
  await carModel.addCar("Honda", "CR-V", 2009,"description","https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  const testResponse = await testRequest.delete("/cars/Honda/CR-V/2009");
  expect(testResponse.status).toBe(200);
});

test("DELETE /cars failure case, when it's database error (not found)", async () => {
  const testResponse = await testRequest.delete("/cars/Toyota/corolla/2017");
  expect(testResponse.status).toBe(500);
});
