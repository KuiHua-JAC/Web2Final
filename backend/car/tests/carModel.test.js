const { DatabaseError } = require("../../error/DatabaseError.js");
const { InvalidInputError } = require("../../error/InvalidInputError.js");
const { MongoMemoryServer } = require("mongodb-memory-server");
const db = "car_db_test";
const carModel = require("../carModel.js");
const { getCarCollection } = require("../../dbConnection.js");
const logger = require("../../logger.js");
require("dotenv").config();

jest.setTimeout(5000);

const carData = [
    {
      make:"Audi",
      model:"R8",
      year:2019,
      description:"Performance car",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

    },
    {
        make:"Honda",
        model:"Civic",
        year:2022,
        description:"Performance car2",
        image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
        make:"Acura",
        model:"TL",
        year:2014,
        description:"Performance car",
        image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
        make:"Ford",
        model:"F-150",
        year:2016,
        description:"Performance car3",
        image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
        make:"Tesla",
        model:"Model X",
        year:2022,
        description:"Performance car4",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
        make:"Toyota",
        model:"Rav4",
        year:2017,
        description:"Performance car5",
        image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
    const { make, model, year, description, image } = generateCarData();
    await carModel.addCar(make, model, year, description, image);
  
    // Gets the data from the database
    const cursor = await carModel.getCarCollection().find();
    const results = await cursor.toArray();
  
    // Checks if there is an array of data that matches in length with the data sent in
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
  
    expect(results[0].make.toLowerCase() == make.toLowerCase()).toBe(true);
    expect(results[0].model.toLowerCase() == model.toLowerCase()).toBe(true);
    expect(results[0].year == year).toBe(true);
    expect(results[0].description.toLowerCase() == description.toLowerCase()).toBe(true);
    expect(results[0].image.toLowerCase() == image.toLowerCase()).toBe(true);
  });

  test("Can get a car in DB", async () => {
    const { make, model, year, description, image } = generateCarData();
  
    // Inserts the car in the database
    await getCarCollection().insertOne({
      make: make,
      model: model,
      year: year,
      description:description,
      image:image
    });
    // Gets the data from the database
  const car = await carModel.getSingleCar(make,model,year);

  expect(car.make.toLowerCase() == make.toLowerCase()).toBe(true);
  expect(car.model.toLowerCase() == model.toLowerCase()).toBe(true);
  expect(car.year == year).toBe(true);
  expect(results[0].description.toLowerCase() == description.toLowerCase()).toBe(true);
  expect(results[0].image.toLowerCase() == image.toLowerCase()).toBe(true);
});


test("Can update a car in DB", async () => {

  const newModel = "TT";

let  testCar=
{
  make:"Audi",
  model:"R8",
  year:2019,
  description:"Performance",      
  image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      
}

let  updatedTestCar=
{
  make:"Audi",
  model:newModel,
  year:2019,
  description:"Performance",
  image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}

  // Inserts the car in the database
  const collection = carModel.getCarCollection();

  await collection.insertOne({
    make: testCar.make,
    model: testCar.model,
    year: testCar.year,
    description:testCar.description,
    image:testCar.image
  });

  // Changes the car's model to the new model
  await carModel.updateCar(testCar, updatedTestCar);

  // Gets the data from the database
  const cursor = await carModel.getCarCollection().find();
  const results = await cursor.toArray();
  

  // Checks if there is an array of data that matches in length with the data sent in
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBe(1);

  expect(results[0].make.toLowerCase() == updatedTestCar.make.toLowerCase()).toBe(true);
  expect(results[0].model.toLowerCase() == updatedTestCar.model.toLowerCase()).toBe(true);
  expect(results[0].year == updatedTestCar.year).toBe(true);
  expect(results[0].description.toLowerCase() == description.toLowerCase()).toBe(true);
  expect(results[0].image.toLowerCase() == image.toLowerCase()).toBe(true);
});
 
test("Can delete a car from DB", async () => {
 let testCar=
{
  make:"Audi",
  model:"R8",
  year:2019,
  description:"Performance",
  image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}

  
    // Inserts the car in the database
    await carModel.getCarCollection().insertOne({
      make: testCar.make,
      model: testCar.model,
      year: testCar.year,
      description:testCar.description,
      image:testCar.image
    });

  // Deletes the car from the database
  await carModel.deleteSingleCar(testCar);

  // Gets the data from the database
  const cursor = await carModel.getCarCollection().find();
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
   let car = {
      make:"Toyota",
      model:"HIGHLANDER",
      year:2022,
      description:"description",
      image:"https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
    await carModel.addCar("Toyota", "Highlander", 2022,"descritpion","https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    await carModel.deleteSingleCar(car);
  } catch (error) { 
    if (error instanceof DatabaseError) errorFlag = true;
  }
  expect(errorFlag).toBe(false);
});

test("Trying to delete a car with a model that doesn't exist in database should throw an error", async () => {
  let errorFlag = false;
  try {
   let deleteCar = {
      make:"Audi",
      model:"Q3",
      year:2017
    }
    await carModel.deleteSingleCar(deleteCar);
  } catch (error) {
    if (error instanceof DatabaseError) errorFlag = true;
  }
  expect(errorFlag).toBe(true);
});