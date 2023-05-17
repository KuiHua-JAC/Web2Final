const { DatabaseError } = require("../../error/DatabaseError.js");
const { InvalidInputError } = require("../../error/InvalidInputError.js");
const { MongoMemoryServer } = require("mongodb-memory-server");
const carModel = require("../carModel.js");
const logger = require("../../logger.js");
require("dotenv").config();

jest.setTimeout(5000);

const carData = [
    {
      make:"Audi",
      model:"R8",
      year:2019,
      trim:"Performance",
      color:"red"

    },
    {
        make:"Honda",
        model:"Civic",
        year:2022,
        trim:"Touring",
        color:"black"
    },
    {
        make:"Acura",
        model:"TL",
        year:2014,
        trim:"A-spec",
        color:"silver"
    },
    {
        make:"Ford",
        model:"F-150",
        year:2016,
        trim:"XL",
        color:"blue"
    },
    {
        make:"Tesla",
        model:"Model X",
        year:2022,
        trim:"Plaid",
        color:"white"
    },
    {
        make:"Toyota",
        model:"Rav4",
        year:2017,
        trim:"LE",
        color:"brown"
    },
  ];

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

const generateCarData = () =>
  carData.splice(Math.floor(Math.random() * carData.length), 1)[0];


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

// SUCCESS TEST CASES

  test("Can add a car to DB", async () => {
    const { make, model, year, trim, color } = generateCarData();
    await carModel.addCar(make, model, year, trim, color);
  
    // Gets the data from the database
    const cursor = await carModel.getCollection().find();
    const results = await cursor.toArray();
  
    // Checks if there is an array of data that matches in length with the data sent in
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
  
    expect(results[0].make.toLowerCase() == make.toLowerCase()).toBe(true);
    expect(results[0].model.toLowerCase() == model.toLowerCase()).toBe(true);
    expect(results[0].year == year).toBe(true);
    expect(results[0].trim.toLowerCase() == trim.toLowerCase()).toBe(true);
    expect(results[0].color.toLowerCase() == color.toLowerCase()).toBe(true);
  });

  test("Can get a car in DB", async () => {
    const { make, model, year, trim, color } = generateCarData();
  
    // Inserts the car in the database
    await carModel.getCollection().insertOne({
      make: make,
      model: model,
      year: year,
      trim:trim,
      color:color,
    });
    // Gets the data from the database
  const car = await carModel.getSingleCar(make,model,year);

  expect(car.make.toLowerCase() == make.toLowerCase()).toBe(true);
  expect(car.model.toLowerCase() == model.toLowerCase()).toBe(true);
  expect(car.year == year).toBe(true);
  expect(car.trim.toLowerCase() == trim.toLowerCase()).toBe(true);
  expect(car.color.toLowerCase() == color.toLowerCase()).toBe(true);
});


test("Can update a car in DB", async () => {

  const newModel = "TT";

  testCar={make:"Audi",
  model:"R8",
  year:2019,
  trim:"Performance",
  color:"red"}

  updatedTestCar={make:"Audi",
  model:newModel,
  year:2019,
  trim:"Performance",
  color:"red"}

  // Inserts the car in the database
  const collection = carModel.getCollection();

  await collection.insertOne({
    make: testCar.make,
    model: testCar.model,
    year: testCar.year,
    trim:testCar.trim,
    color:testCar.color,
  });

  // Changes the car's model to the new model
  await carmModel.updateCar(testCar, updatedTestCar);

  // Gets the data from the database
  const cursor = await carModel.getCollection().find();
  const results = await cursor.toArray();
  

  // Checks if there is an array of data that matches in length with the data sent in
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBe(1);

  expect(results[0].make.toLowerCase() == updatedTestCar.make.toLowerCase()).toBe(true);
  expect(results[0].model.toLowerCase() == updatedTestCar.model.toLowerCase()).toBe(true);
  expect(results[0].year == updatedTestCar.year).toBe(true);
  expect(results[0].trim.toLowerCase() == updatedTestCar.trim.toLowerCase()).toBe(true);
  expect(results[0].color.toLowerCase() == updatedTestCar.color.toLowerCase()).toBe(true);
});
 
test("Can delete a car from DB", async () => {
  testCar={make:"Audi",
  model:"R8",
  year:2019,
  trim:"Performance",
  color:"red"}

  
    // Inserts the car in the database
    await carModel.getCollection().insertOne({
      make: testCar.make,
      model: testCar.model,
      year: testCar.year,
      trim:testCar.trim,
      color:testCar.color,
    });

  // Deletes the car from the database
  await carModel.deleteSingleCar(testCar);

  // Gets the data from the database
  const cursor = await carModel.getCollection().find();
  const results = await cursor.toArray();

  // Checks if there is an array of data that matches in length with the data sent in
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBe(0);
});

// FAILURE TEST CASES

test("Adding an empty car make to the database should fail and throw an error", async () => {
  try {
    await carModel.addCar(" ", "model", 2011,"trim","color");
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Adding an empty car model to the database should fail and throw an error", async () => {
  try {
    await carModel.addCar("make", " ", 2011,"trim","color");
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Adding a car year that is less then the minimum year to the database should fail and throw an error", async () => {
  try {
    await carModel.addCar("make", " ", 1756,"trim","color");
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Adding a car year that is more then the maximum year to the database should fail and throw an error", async () => {
  try {
    await carModel.addCar("make", " ", 2077,"trim","color");
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Trying to delete a car with a make that doesn't have the same capitalization in database should not throw an error", async () => {
  let errorFlag = false;
  try {
    car = {
      make:"Toyota",
      model:"HIGHLANDER",
      year:2022,
      trim:"trim",
      color:"color"
    }
    await carModel.addCar("Toyota", "Highlander", 2022,"trim","color");
    await model.deleteSingleCar(car);
  } catch (error) { 
    if (error instanceof DatabaseError) errorFlag = true;
  }
  expect(errorFlag).toBe(false);
});