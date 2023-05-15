const validator = require("validator");
let date = new Date();
const MINYEAR = 1886;
const MAXYEAR = date.getFullYear() + 1;
const { InvalidInputError } = require("../error/InvalidInputError.js");

/**
 * Checks if the given car object is valid by checking its make, model, and year.
 * @param {string} make - The make of the car.
 * @param {string} model - The model of the car.
 * @param {number} year - The year the car was manufactured.
 * @returns {boolean} - Returns true if the car is valid.
 * @throws {InvalidInputError} - Throws an error if any of the inputs are invalid.
 */

function isValidCar(make, model, year) {
  isValidMake(make)
  isValidModel(model)
  isValidYear(year)

  return true;
 
}


/**
 * Checks if the given make is valid by checking if it is not empty and contains only alphabets.
 * @param {string} make - The make of the car.
 * @returns {boolean} - Returns true if the make is valid.
 * @throws {InvalidInputError} - Throws an error if the make is empty or contains non-alphabetic characters.
 */

function isValidMake(make) {
  if (!make || !validator.isAlpha(make)) {
    throw new InvalidInputError("The car make must not be empty or have numbers ");
  } 
}

/**
 * Checks if the given model is valid by checking if it is not empty and its length is between 1 and 50 characters.
 * @param {string} model - The model of the car.
 * @returns {boolean} - Returns true if the model is valid.
 * @throws {InvalidInputError} - Throws an error if the model is empty or longer than 50 characters.
 */

function isValidModel(model) {
  if (!model || !validator.isLength(model, { min: 1, max: 50 })) {
    throw new InvalidInputError("The car model must not be empty or longer then 50 characters ");
  } 
}

/**
 * Checks if the given year is valid by checking if it is not empty, is an integer, and its value is between 1886 and the current year plus 1.
 * @param {number} year - The year the car was manufactured.
 * @returns {boolean} - Returns true if the year is valid.
 * @throws {InvalidInputError} - Throws an error if the year is empty, not an integer, or is outside the valid range.
 */

function isValidYear(year) {
  if (!year || !validator.isInt(year) || year < MINYEAR || year > MAXYEAR) {
    throw new InvalidInputError("The car year must not be empty, it must be a number and it can not be less then 1886 or bigger then the next year from the current one");
  } else {
    return true;
  }
}

module.exports = { isValidCar, isValidModel, isValidYear, isValidMake };
