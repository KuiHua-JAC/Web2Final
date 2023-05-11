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

    // Means no cars were deleted
    if (carDelete.deletedCount == 0)
      throw new DatabaseError(`Delete ${car.make, car.model, car.year} failed.`);
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

// TODO for update, you can combine all three together, look at my update for example.
// In the frontend, when a "car" is being updated, the form will fill up with the old values first
// so as long they dnt change the fields it's fine.
async function updateCar(car, updatedCar) {
  try {
      let updatedNewCar = await getCarCollection().updateOne(car, {
        $set: {make: updatedCar.make
          ,model: updatedCar.model 
          ,year: updatedCar.year },
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
