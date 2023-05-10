const { getCarCollection } = require("../dbConnection.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const validateUtils = require("./validateUtils.js");
const validator = require("validator");
const logger = require("../logger.js");

//TODO makes sure that there is no car that has the same model/make/year. You can do so by finding a car first with that information, then
// if there is one, throw an error. For reference, look at my AddCarReview in my model. Same thing for update, make sure there's only one instance of
// the car.
/**
Inserts a new car document into the database.
@param {string} make - The make of the car.
@param {string} model - The model of the car.
@param {number} year - The year of the car.
@throws {Error} If the make, model, or year is invalid.
@throws {DatabaseError} If there is an error adding the car document.
*/

// TODO check with car review model to see if the returns are the same, and update documentation accordingly (base ur code off of Kui Hua's)
async function addCar(make, model, year) {
  validateUtils.isValidCar(make, model, year);
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

// TODO for update, you can combine all three together, look at my update for example.
// In the frontend, when a "car" is being updated, the form will fill up with the old values first
// so as long they dnt change the fields it's fine.
/**
Updates the make of a single car in the database.
@param {Object} car - The car to be updated in the database.
@param {string} make - The new make of the car.
@throws {DatabaseError} - If an error occurs while updating the car in the database.
*/
async function updateCarMake(car, make) {
  try {
    if (validateUtils.isValidMake(make)) {
      let updatedCar = await getCarCollection().updateOne(car, {
        $set: { make: make },
      });
      if (updatedCar.matchedCount == 0)
        throw new DatabaseError(
          `Updating the model of ${(car.make, car.model, car.year)} failed.`
        );
      return true;
    } else {
      console.log("Make is invalid");
      return false;
    }
  } catch (e) {
    logger.warn(
      `Error while trying to update a car make of ${
        (car.make, car.model, car.year)
      }` + e.message
    );
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for updating the car make of ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while updating the car make of ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    else throw e;
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
      let updatedCar = await getCarCollection().updateOne(car, {
        $set: { model: model },
      });
      if (updatedCar.matchedCount == 0)
        throw new DatabaseError(
          `Updating the model of ${(car.make, car.model, car.year)} failed.`
        );
      return true;
    } else {
      console.log("Model is invalid");
      return false;
    }
  } catch (e) {
    logger.warn(
      `Error while trying to update a car model of ${
        (car.make, car.model, car.year)
      }` + e.message
    );
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for updating the car model of ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while updating the car model of ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    else throw e;
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
      let updatedCar = await getCarCollection().updateOne(car, {
        $set: { year: year },
      });
      if (updatedCar.matchedCount == 0)
        throw new DatabaseError(
          `Updating the year of ${(car.make, car.model, car.year)} failed.`
        );
      return true;
    } else {
      console.log("The year is invalid");
    }
  } catch (e) {
    logger.warn(
      `Error while trying to update a car year of ${
        (car.make, car.model, car.year)
      }` + e.message
    );
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for updating the car year of ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while updating the car year of ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    else throw e;
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
