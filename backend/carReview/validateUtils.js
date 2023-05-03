const validator = require("validator");
const { InvalidInputError } = require("../error/InvalidInputError.js");

/**
 * Method to validate the information to be stored in the database
 * @param {string} title The title of the car review
 * @param {string} description The review itself of the car
 * @param {string} score The score of the car, out of max
 * @param {int} min The minimum score possible to give to a car
 * @param {int} max The maximum score possible to give to a car
 * @return {boolean} True if the information sent in is valid
 * @throws {InvalidInputError} If the information sent in is invalid
 */
function isValid(title, description, score, min, max) {
  if (validator.isEmpty(title, { ignore_whitespace: true }))
    throw new InvalidInputError("Car review title must not be empty"); //TODO later the title would be linked to another collection for valid cars

  if (validator.isEmpty(description, { ignore_whitespace: true }))
    throw new InvalidInputError("Car review description must not be empty");

  if (score < min || score > max)
    throw new InvalidInputError(
      `A valid number between ${min} and ${max} must be used for a score `
    );
  return true;
}

module.exports = { isValid };
