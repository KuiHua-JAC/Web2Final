const { getCarCollection } = require("../dbConnection.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const validateUtils = require("./validateUtils.js");
const validator = require("validator");
const logger = require("../logger.js");

/**
 * Inserts a new car document into the database.
 * @param {string} make - The make of the car.
 * @param {string} model - The model of the car.
 * @param {number} year - The year of the car.
 * @throws {InvalidInputError} If the make, model, or year is invalid.
 * @throws {DatabaseError} If there is an error adding the car document.
 * @returns {Promise<boolean>} Returns true if the car was successfully added.
 */
async function addCar(make, model, year, trim, color) {
  validateUtils.isValidCar(make, model, year);
  try {
    const car = { make: make, model: model, year: year, trim: trim, color: color };

    if (await getCarCollection().findOne({ make: car.make,model:car.model,year:car.year }))
    throw new InvalidInputError(
      "Cannot add car: car already in the database"
    );

    const result = await getCarCollection().insertOne(car);
  } catch (err) {
    console.log(err.message);
    throw new DatabaseError("Error adding car");
  }
}

/**
 * Retrieves a single car document from the database based on make, model, and year.
 * @param {string} make - The make of the car.
 * @param {string} model - The model of the car.
 * @param {number} year - The year of the car.
 * @throws {Error} If no car document is found.
 * @throws {DatabaseError} If there is an error getting the car document.
 * @returns {Promise<object>} Returns the car document as an object if found.
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
 * Gets all cars from the database.
 * @throws {DatabaseError} - If an error occurs while getting the cars from the database.
 * @returns {Promise<Array>} - An array of all cars in the database.
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
 * Deletes a single car from the database.
 * @param {Object} car - The car to be deleted from the database.
 * @throws {InvalidInputError} If the make, model, or year is empty or invalid.
 * @throws {DatabaseError} If an error occurs while deleting the car from the database.
 * @returns {Promise<boolean>} Returns true if the car was successfully deleted.
 */
async function deleteSingleCar(car) {
  try {
    if (validator.isEmpty(car.make, { ignore_whitespace: true }))
      //Makes sure the make is not empty
      throw new InvalidInputError("Car make must not be empty");

      if (validator.isEmpty(car.model, { ignore_whitespace: true }))
      //Makes sure the model is not empty
      throw new InvalidInputError("Car model must not be empty");

      if (validator.isEmpty(car.year))
      //Makes sure the year is not empty
      throw new InvalidInputError("Car year must not be empty");

      const query = { make: car.make, model:car.model, year:car.year };

    let carDelete = await getCarCollection().deleteOne({
      make: car.make,
    });
    
    return true;

  } catch (e) {
    logger.warn(`Error while deleting ${car.make, car.model, car.year}: ${e.message}`);
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for deleting car: ${car.make, car.model, car.year}: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while deleting car: ${car.make, car.model, car.year}: ${e.message}`
      );
    else throw e;
  }
}

/**
 * Updates an existing car in the database with new information.
 * @param {Object} car - The car object to update in the database.
 * @param {Object} updatedCar - The updated car object with new information.
 * @param {string} updatedCar.make - The make of the updated car.
 * @param {string} updatedCar.model - The model of the updated car.
 * @param {number} updatedCar.year - The year of the updated car.
 * @throws {InvalidInputError} If the updated version of the car is already in the database.
 * @throws {DatabaseError} If there was an error updating the car in the database.
 * @returns {boolean} Returns true if the car was successfully updated in the database.
 */
async function updateCar(car, updatedCar) {
  try {
    if (await getCarCollection().findOne({ make: updatedCar.make,model:updatedCar.model,year:updatedCar.year }))
    throw new InvalidInputError(
      "Cannot update car: the updated version is already in the database"
    );

      let updatedNewCar = await getCarCollection().updateOne(car, {
        $set: {make: updatedCar.make
          ,model: updatedCar.model 
          ,year: updatedCar.year, 
          trim: updatedCar.trim,
          color: updatedCar.color },
      });
      if (updatedNewCar.matchedCount == 0)
        throw new DatabaseError(
          `Updating the car: ${(car.make, car.model, car.year)} failed.`
        );
      return true;
   
    }
   catch (e) {
    logger.warn(
      `Error while trying to update a car: ${
        (car.make, car.model, car.year)
      }` + e.message
    );
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for updating the car: ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while updating the car: ${
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
  updateCar
};
