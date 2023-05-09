const { getCarCollection } = require("../dbConnection.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const validateUtils = require("./validateUtils.js");
const validator = require("validator");
const logger = require("../logger.js");

// TODO instead of returning true,  return a object with a message that would say that wtv operation you are doing is succesful
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
    const result = await getCarCollection().insertOne(car);
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
    const query = { make: make, model: model, year: year };
    let result = await getCarCollection().findOne(query);
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
    const results = await getCarCollection().find({}).toArray();
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
    const query = { make: car.make };
    await getCarCollection().deleteOne(query);
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
    if (validateUtils.isValidMake(make)) {
      await getCarCollection().updateOne(car, { $set: { make: make } });
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
    if (validateUtils.isValidModel(model)) {
      await getCarCollection().updateOne(car, { $set: { model: model } });
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
    if (validateUtils.isValidYear(year)) {
      await getCarCollection().updateOne(car, { $set: { year: year } });
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
  addCar,
  getSingleCar,
  getAllCars,
  deleteSingleCar,
  updateCarMake,
  updateCarModel,
  updateCarYear,
};
