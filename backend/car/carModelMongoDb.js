const dbName = "Car_db";
const { MongoClient } = require("mongodb");
const validateUtils = require("./validateUtils");
const { DatabaseError } = require("./models/databaseError");
const logger = require("pino")();

let client;
let carsCollection;

/**
Initializes the database connection and creates the cars collection if it doesn't exist.
@throws {DatabaseError} If there is an error connecting to the database.
*/

async function initialize() {
  try {
    let resetFlag = false;
    const url =
      process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;
    client = new MongoClient(url);
    await client.connect();
    logger.info("Connected to MongoDb");
    const db = client.db(dbName);
    collectionCursor = await db.listCollections({ name: "cars" });
    collectionArray = await collectionCursor.toArray();
    if (collectionArray[0] == "cars" && resetFlag) {
      await db.dropCollection("cars");
    }
    if (collectionArray.length == 0 || resetFlag) {
      await db.createCollection("cars", {
        collation: { locale: "en", strength: 1 },
      });
    }
    carsCollection = db.collection("cars");
  } catch (err) {
    logger.error(err.message);
    throw new DatabaseError("Error Connecting to MongoDB");
  }
}

/**
Inserts a new car document into the database.
@param {string} make - The make of the car.
@param {string} model - The model of the car.
@param {number} year - The year of the car.
@throws {Error} If the make, model, or year is invalid.
@throws {DatabaseError} If there is an error adding the car document.
*/

async function addCar(make, model, year) {
  if (!validateUtils.isValidCar(make, model, year)) {
    throw new Error("Invalid car");
  }

  try {
    const car = { make: make, model: model, year: year };
    const result = await carsCollection.insertOne(car);
  } catch (err) {
    console.log(err.message);
    throw new DatabaseError("Error adding car");
  }
}

/**
Retrieves a single car document from the database based on make, model, and year.
@param {string} make - The make of the car.
@param {string} model - The model of the car.
@param {number} year - The year of the car.
@throws {Error} If no car document is found.
@throws {DatabaseError} If there is an error getting the car document.
*/

async function getSingleCar(make, model, year) {
  try {
    const database = client.db(dbName);
    const cars = database.collection("cars");
    const query = { make: make, model: model, year: year };
    let result = await cars.findOne(query);
    if (result === null) {
      throw new Error("No car found");
    }

    return result;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error getting car");
  }
}

/**
Gets all cars from the database.
@returns {Promise<Array>} - An array of all cars in the database.
@throws {DatabaseError} - If an error occurs while getting the cars from the database.
*/

async function getAllCars() {
  try {
    const database = client.db(dbName);
    const cars = database.collection("cars");
    const results = await cars.find({}).toArray();
    if (results === null) {
      throw new Error("No cars found");
    }

    return results;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error getting cars");
  }
}

/**
Deletes a single car from the database.
@param {Object} car - The car to be deleted from the database.
@throws {DatabaseError} - If an error occurs while deleting the car from the database.
*/

async function deleteSingleCar(car) {
  try {
    const database = client.db(dbName);
    const cars = database.collection("cars");
    const query = { make: car.make };
    await cars.deleteOne(query);
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error deleting car");
  }
}

/**
Updates the make of a single car in the database.
@param {Object} car - The car to be updated in the database.
@param {string} make - The new make of the car.
@throws {DatabaseError} - If an error occurs while updating the car in the database.
*/

async function updateCarMake(car, make) {
  try {
    const database = client.db(dbName);
    const cars = database.collection("cars");
    if (validateUtils.isValidMake(make)) {
      await cars.updateOne(car, { $set: { make: make } });
      return true;
    } else {
      console.log("Make is invalid");
      return false;
    }
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error updating the car");
  }
}

/**
Updates the model of a single car in the database.
@param {Object} car - The car to be updated in the database.
@param {string} model - The new model of the car.
@throws {DatabaseError} - If an error occurs while updating the car in the database.
*/

async function updateCarModel(car, model) {
  try {
    const database = client.db(dbName);
    const cars = database.collection("cars");
    if (validateUtils.isValidModel(model)) {
      await cars.updateOne(car, { $set: { model: model } });
      return true;
    } else {
      console.log("Model is invalid");
      return false;
    }
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error updating the car");
  }
}

/**
Updates the year of a single car in the database.
@param {Object} car - The car to be updated in the database.
@param {number} year - The new year of the car.
@throws {DatabaseError} - If an error occurs while updating the car in the database.
*/

async function updateCarYear(car, year) {
  try {
    const database = client.db(dbName);
    const cars = database.collection("cars");
    if (validateUtils.isValidYear(year)) {
      await cars.updateOne(car, { $set: { year: year } });
      return true;
    } else {
      console.log("The year is invalid");
    }
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error updating the car");
  }
}

module.exports = {
  initialize,
  addCar,
  getSingleCar,
  getAllCars,
  deleteSingleCar,
  updateCarMake,
  updateCarModel,
  updateCarYear,
};
